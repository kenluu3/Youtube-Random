import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from '../../images/icon.jpg';

import './navbar.css';

import { Link, NavLink } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

function NavigationBar() {

    return(
        <Navbar collapseOnSelect expand='xl' fixed='top'> 
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
                <Nav.Link as={NavLink} to='/profile' href='/profile' activeClassName='nav-selected'>Profile</Nav.Link>
                <Nav.Link as={NavLink} to='/logout' href='/logout'>Logout</Nav.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar;