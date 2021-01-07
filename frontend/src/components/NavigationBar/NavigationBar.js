import { Fragment } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from '../../images/icon.jpg';

import jwt from '../../api-client/jwtdecoder';

import './navbar.css';

import { Link, NavLink, useLocation } from 'react-router-dom';

function NavigationBar() {

    const location = useLocation();
    let isLogged = false;

    if (jwt) { // has jwt means user is authenticated
        isLogged = true;
    }

    const handleLogout = () => {
        localStorage.clear();
    }

    return(
        <Navbar collapseOnSelect expand='xl'> 
            <Navbar.Brand>
                <Link to='/home'>
                    <img 
                        src={Logo}
                        alt='YTR'
                        className='logo'
                    />
                </Link>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls='navbar-collapse-content' />

            <Navbar.Collapse>
                <Nav.Link as={NavLink} to='/home' href='/home' activeClassName='nav-selected'>Home</Nav.Link>
                {  isLogged !== null ? // Only show these components if logged in 
                    <Fragment>
                        <Nav.Link as={NavLink} to='/profile' href='/profile' activeClassName='nav-selected'>Profile</Nav.Link>
                        <Nav.Link as={NavLink} to={location.pathname} onClick={() => handleLogout()}>Logout</Nav.Link> 
                    </Fragment>
                : 
                    <Fragment>
                        <Nav.Link as={NavLink} to='/register'>Register</Nav.Link>
                        <Nav.Link as={NavLink} to='/login'>Login</Nav.Link> 
                    </Fragment>
                }   
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar;