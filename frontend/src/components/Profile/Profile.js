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
    let [favorites, setFavorites] = useState(''); 
    const { user } = useParams(); // URI user.

    const sameUser = () => { // Determines if Auth user is viewing own profile.
        return user === auth.user; 
    }

    useEffect(() => { 
        const retrieveProfile = async() => {
            try {
                const response = await getProfile(user, auth.jwt);
                const {favorites, ...information} = response.data.profile;

                // profile will only have a value if user is authenticated & viewing own profile.
                setProfile({...information, password: ''}); // passing empty password for initial state.
                setFavorites({...response.data.profile.favorites}); // only contains favorites list.

            } catch(err) { // server error occurred;
                console.log(err.response.data); 
            }
        }

        retrieveProfile(); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Occurs after initial render.

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
                            <Favorites favoriteList={favorites}/>
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