import { useState, Fragment } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from '../../images/icon.jpg';

import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout, loadJWT } from '../../redux/actions/authActions';

import './navbar.css';

function NavigationBar() {

    const dispatch = useDispatch();
    let auth = useSelector(state => state.auth);

    if (auth.jwt == '') { // on render, checks if the user is logged in via localStorage.
        let token = localStorage.getItem('token');
        if (token) {
            dispatch(loadJWT(token)); // updates app state with user.
        }
    }

    const handleLogout = () => { // clears the token.
        dispatch(logout());
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
                <span style={{color: 'white', marginLeft: '10px'}}>{auth.user}</span>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls='navbar-collapse-content' />

            <Navbar.Collapse id='navbar-collapse-content'>
                <Nav.Link 
                    as={NavLink} 
                    to='/home' 
                    href='/home' 
                    className='ml-auto'
                    activeClassName='nav-selected'
                >
                    Home
                </Nav.Link>

                {  auth.jwt !== '' ? // Show links if user is authenticated.
                    <Fragment>
                        <Nav.Link 
                            as={NavLink} 
                            to={`/profile/${auth.user}`} 
                            href={`/profile/${auth.user}`}
                            activeClassName='nav-selected'
                        >
                            Profile
                        </Nav.Link>

                        <Nav.Link 
                            as={NavLink} 
                            to='/home' // redirect to homepage if user is on profile page.
                            onClick={() => handleLogout()}
                        >
                            Logout
                        </Nav.Link> 
                    </Fragment>
                : 
                    <Fragment>
                        <Nav.Link 
                            as={NavLink} 
                            to='/login'
                        >
                            Login
                        </Nav.Link> 
                    </Fragment>
                }   
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar;