import { Fragment } from 'react';

import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

// child components
import UserInformation from './UserInformation/UserInformation';
import Favorites from './Favorites/Favorites';

import icon from './icon.jpg';

import './profile.css';

import { useParams } from 'react-router-dom';

function Profile() {

    const isLogged = localStorage.getItem('token');
    let { user } = useParams(); // extract user from url param
    console.log(user);
    let defaultTab = 'favorites'; // default to favorites tab if user is not signed in.
    if (isLogged) {
        defaultTab = 'user-information'
    }

    return(
        <Container> 
            <Container className='profile-header'>
                <img
                    src={icon}
                    alt='icon'
                    id='profile-icon'
                />
                <header className='profile-name'>USER</header>
            </Container>

            <Tabs defaultActiveKey={defaultTab} id='profile-parent-tab'>
                <Tab eventKey='user-information' title='Information'>
                    <UserInformation />
                </Tab>
                { /*
                <Tab eventKey='favorites' title='Favorites'>
                    <Favorites />
                </Tab>
                */} 
            </Tabs>
        </Container>
    );
}   


export default Profile;