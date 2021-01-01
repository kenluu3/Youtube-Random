// bootstrap components
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useDispatch, useSelector } from 'react-redux';

// routing
import { Link } from 'react-router-dom'; 

import './login.css';

function Login() {



        return(
            <Container className='login-container'>
                <header className='text-center login-header form-header'>YouTube Random</header>

                <Form className='login-form'>
                    <Form.Group className='login-input-wrapper'>
                        <Form.Control className='form-input' type='text' placeholder='Email or username' autoComplete='off'></Form.Control>
                    </Form.Group>

                    <Form.Group className='login-input-wrapper'>
                        <Form.Control className='form-input' type='password' placeholder='Password' autoComplete='off'></Form.Control>
                        <Link to='' className='login-link'>Forgot password?</Link>
                    </Form.Group>

                    <Form.Group className='login-button-container'>
                        <Button id='login-btn'>Login</Button>
                        <Form.Label id='login-signup' className='form-text-color'>Need an account?</Form.Label>
                        <Link to='register' className='login-link'>Sign up here</Link>
                    </Form.Group>
                </Form>
            </Container>
        );

}

export default Login;