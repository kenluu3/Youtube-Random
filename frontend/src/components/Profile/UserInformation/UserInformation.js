import { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { patchProfile } from '../../../api-client';
import { useHistory } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux';
import { loadJWT } from '../../../redux/actions/authActions';

import './userinfo.css';

function UserInformation(props) {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();

    const initial = () => { // if data exists in localstorage then page was re-rendered after username change.
        const profileInfo = JSON.parse(localStorage.getItem('saved'));
        if (profileInfo) {
            localStorage.removeItem('saved');
            return {...profileInfo, password: ''};
        }

        return {...props.profile};
    }

    let [profile, setProfile] = useState(initial()); 

    const handleSave = async () => {
        let update = {}; // stores all updated fields.
        const fields = Object.keys(profile); 

        fields.forEach(field => { // appending updating fields to update obj.
            if (props.profile[field] !== profile[field] && profile[field] !== '') { // need to fix so after one update it does not keep updating again.
                update = {...update, [field]: profile[field]}; 
            }
        });
        
        if (Object.keys(update).length > 0) { // fields to be saved
            try {
                let response = await patchProfile(auth.user, update, auth.jwt);

                if (response.data.token) { // token only returned if username changes.
                    localStorage.setItem('token', response.data.token); // update localStorage.
                    localStorage.setItem('saved', JSON.stringify(profile)); // store the updated fields in localStorage for re-render.
                    dispatch(loadJWT(response.data.token));
                    history.push(`/profile/${profile.username}`); // updating resource path.
                } 
            } catch(err) { // error occurred while saving.
                console.log(err.response.data);
            }
        } 
    }

    const handleInput = (event) => {
        const {name, value} = event.target;
        setProfile({...profile, [name]: value});
    }

    return(
        <Container className='user-info-container'>
            <Form>
                <Form.Group>
                    <Form.Control 
                        type='text'
                        name='name'
                        value={profile.name}
                        onChange={(event) => handleInput(event)}
                        className='form-input-field info-input'
                        autoComplete='off'
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        type='text'
                        name='username'
                        value={profile.username}
                        onChange={(event) => handleInput(event)}
                        className='form-input-field info-input'
                        autoComplete='off'
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        type='email'
                        name='email'
                        value={profile.email}
                        onChange={(event) => handleInput(event)}
                        className='form-input-field info-input'
                        autoComplete='off'
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        type='password'
                        name='password'
                        placeholder='New Password'
                        value={profile.password}
                        onChange={(event) => handleInput(event)}
                        className='form-input-field info-input'
                        autoComplete='off'
                    />
                </Form.Group>
                
                <Button 
                    block
                    id='info-save-btn'
                    onClick={() => handleSave()}
                >
                    Save Changes
                </Button>

            </Form>
        </Container>
    ); 
}

export default UserInformation;

