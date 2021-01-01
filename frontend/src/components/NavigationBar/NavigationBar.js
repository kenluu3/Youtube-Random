// Logo
import logo from './icon.jpg';

// bootstrap components
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './navbar.css';

//router
import { Link, NavLink } from 'react-router-dom';

function NavigationBar() {
    
    return  (
            <Navbar collapseOnSelect className='navbar' expand='xl' fixed='top'>

                <Navbar.Brand>
                    <Link to='/'>
                        <img 
                            src={logo}
                            alt='YTR'
                            className='logo'
                        />
                    </Link>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls='collapse-content' />

                <Navbar.Collapse className='ml-auto nav-list' id='collapse-content'>
                    <Nav.Link as={NavLink} to='/home' href='/home' activeClassName='nav-selected'>Home</Nav.Link>
                    <Nav.Link as={NavLink} to='/profile' href='/profile' activeClassName='nav-selected'>Profile</Nav.Link>
                    <Nav.Link as={NavLink} to='/logout' href='/logout'>Logout</Nav.Link>
                </Navbar.Collapse>
            
            </Navbar>           
            
        );
}




export default NavigationBar;