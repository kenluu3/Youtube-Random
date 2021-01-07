import { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import jwt from '../../../api-client/jwtdecoder';
import { getProfile } from '../../../api-client';

import './userinfo.css';

function UserInformation() {

    // current user info - jwt holds: username, email, name
    const initialData = {
        name: jwt.name,
        username: jwt.username,
        email : jwt.email
    };

    const initialState = {
        ...initialData,
        password: ''
    };

    // storing potential changes to user data.
    const [user, setUser] = useState(initialState);

    return(
        <Container className='user-info-container'>
            <Form>
                <Form.Group>
                    <Form.Control 
                        type='text'
                        name='name'
                        value={user.name}
                        className='form-input-field info-input'
                        autoComplete='off'
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        type='text'
                        name='username'
                        value={user.username}
                        className='form-input-field info-input'
                        autoComplete='off'
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        type='email'
                        name='email'
                        value={user.email}
                        className='form-input-field info-input'
                        autoComplete='off'
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        type='password'
                        name='password'
                        placeholder='Enter a password to save.'
                        value={user.password}
                        className='form-input-field info-input'
                        autoComplete='off'
                    />
                </Form.Group>
                
                <Button 
                    block
                    id='info-save-btn'
                >
                    Save Changes
                </Button>

            </Form>
        </Container>
    ); 
}

export default UserInformation;

