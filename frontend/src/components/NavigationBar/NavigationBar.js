import { Fragment, useState } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Logo from '../../images/icon.png';

import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { logout, loadUser } from '../../redux/actions/authActions';

import './navbar.css';

function NavigationBar() {

    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState('');
    const history = useHistory();
    let auth = useSelector(state => state.auth);

    if (auth.user === '') { // on render, checks if the user is logged in via localStorage.
        let token = localStorage.getItem('token');
        if (token) {
            dispatch(loadUser(token)); // updates app state with user.
        }
    }

    const handleLogout = () => { // clears the token.
        dispatch(logout());
    }

    const handleEnter = async (event) => { // will return profile of entered user.
        if (event.which === 13 && searchInput.trim() !== '') { // enter key
            event.preventDefault(); // prevent default refresh behaviour.
            history.push(`/profile/${searchInput.trim()}`);
            setSearchInput(''); // clear input
        }
    }

    const handleInput = (event) => {
        setSearchInput(event.target.value);
    }

    return(
        <Navbar collapseOnSelect expand='xl'> 
            <Navbar.Brand>
                {auth.user ? 
                <Fragment>
                    <Link to='/home'>
                        <img 
                            src={Logo}
                            alt='YTR'
                            className='logo'
                        />
                    </Link>
                    <span className='nav-user text-white'>{auth.user}</span>
                </Fragment>
                :
                    <span className='nav-header text-white'>YouTube Random</span>
                }
            </Navbar.Brand>

            <Navbar.Toggle aria-controls='navbar-collapse-content' />

            <Navbar.Collapse id='navbar-collapse-content'>

                <Form className='nav-search-container ml-auto'>
                    <Form.Control
                        type='text'
                        className='form-input-field nav-search'
                        placeholder='VIEW A PROFILE'
                        value={searchInput}
                        onChange={(event) => handleInput(event)}
                        onKeyDown={(event) => handleEnter(event)}
                    />
                </Form>

                <Nav.Link 
                    as={NavLink} 
                    to='/home' 
                    href='/home' 
                    activeClassName='nav-selected'
                >
                    Home
                </Nav.Link>

                {  auth.user !== '' ? // Show links if user is authenticated.
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