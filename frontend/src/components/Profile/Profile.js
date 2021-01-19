import { useState, useEffect, Fragment } from 'react';

import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfile } from '../../api-client';

// child components
import UserInformation from './UserInformation/UserInformation';
import Favorites from './Favorites/Favorites';

import icon from '../../images/icon.png';

import './profile.css';

function Profile() {

    const auth = useSelector(state => state.auth);
    const [profile, setProfile] = useState(''); 
    const { user } = useParams(); // current user profile.

    const sameUser = () => { // Determines if Auth user is viewing own profile.
        return user === auth.user; 
    }

    useEffect(() => { 
        const retrieveProfile = async() => {
            try {
                const response = await getProfile(user);
                const { profile, favorites } = response.data; 
                if (profile) { // user is viewing own profile & authorized.
                    setProfile({
                        info: profile,
                        favorites: favorites
                    });
                } else { // user is viewing another user's profile.
                    setProfile({
                        favorites: favorites
                    });
                }
            } catch(err) { // server error occurred;
                setProfile('');
                console.log(err.response.data); 
            }
        }
        
        retrieveProfile(); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]); // Occurs after everytime path changes.

    
    return(
        <Fragment>
            { profile !== '' ? 
                <Container> 
                    <Container className='profile-header'>
                        <img
                            src={icon}
                            alt='icon'
                            id='profile-icon'
                        />
                        <header className='profile-name'>{user.toUpperCase()}</header>
                    </Container>

                    <Tabs defaultActiveKey={sameUser() ? 'user-information' : 'favorites'} id='profile-parent-tab'>
                        { profile.info ? // Information tab available to authenticated user
                            <Tab eventKey='user-information' title='Information'>
                                <UserInformation profile={profile.info}/>
                            </Tab>  
                        :
                            null
                        }
                        <Tab eventKey='favorites' title='Favorites'>
                            <Favorites favorites={profile.favorites} sameUser={sameUser()} currentUser={auth.user}/>
                        </Tab> 
                    </Tabs>
                </Container>
            :
                <h1 className='text-center text-white' style={{marginTop: '40vh'}}>The {user} does not exist!</h1>
            }
        </Fragment>
    );
}   


export default Profile;