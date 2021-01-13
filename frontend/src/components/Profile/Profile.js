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

import icon from './icon.jpg';

import './profile.css';

function Profile() {

    const auth = useSelector(state => state.auth); // Current AUTH app state.
    let [profile, setProfile] = useState(''); // Profile component state.
    const { user } = useParams(); // URI user.

    const sameUser = () => { // Determines if Auth user is viewing own profile.
        return user === auth.user; 
    }

    // When switching from one user to another ==> Causes an error because component already mounted and the data is not being retrieved again.

    useEffect(() => { 
        const retrieveProfile = async() => {
            try {
                const response = await getProfile(user, auth.jwt);
                setProfile(response.data.profile); // update local profile.
            } catch(err) { // server error occurred;
                console.log(err.response.data); 
            }
        }

        retrieveProfile(); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]); // Occurs after initial render.

    return(
        <Fragment>
            { profile !== '' ? // This will render after mounting via useEffect();
                <Container> 
                    <Container className='profile-header'>
                        <img
                            src={icon}
                            alt='icon'
                            id='profile-icon'
                        />
                        <header className='profile-name'>{user.toUpperCase()}</header>
                    </Container>

                    <Tabs defaultActiveKey={sameUser() ? 'user-information' : 'favorites'} id='profile-parent-tab' unmountOnExit>
                        { sameUser() ? // Information tab available to authenticated user
                            <Tab eventKey='user-information' title='Information'>
                                <UserInformation profile={profile}/>
                            </Tab>  
                        :
                            null
                        }
                        <Tab eventKey='favorites' title='Favorites'>
                            <Favorites favorites={profile} sameUser={sameUser()} token={auth.jwt} authuser={auth.user}/>
                        </Tab> 
                    </Tabs>
                </Container>
            :
                null 
            }
        </Fragment>
    );
}   


export default Profile;