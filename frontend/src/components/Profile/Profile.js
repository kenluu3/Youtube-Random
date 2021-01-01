import { Component, Fragment } from 'react';

// Bootstrap
import Container from 'react-bootstrap/Container';

// components in profile page
//import FavoritesList from '../FavoritesList/FavoritesList';

import logo from './icon.jpg';

import './profile.css';

class Profile extends Component {

    constructor() {
        super();

        this.state = {};
    }

    render() {
        return(
            <Fragment>

                <Container className='profile-header'>
                    <img 
                        src={logo}
                        className='profile-pic' 
                        alt='Profile'
                    />
                    <header className='profile-name'>NAME FILLER</header>                   
                </Container>

            </Fragment>
        );
    }

}


export default Profile;