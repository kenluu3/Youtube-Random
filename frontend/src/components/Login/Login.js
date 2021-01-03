import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Link } from 'react-router-dom';

import './login.css';

function Login() {

    const initialState = {
        username: '',
        password: ''
    }

    const [input, setInput] = useState(initialState);

    const handleInputUsername = (event) => {
        setInput({...input, username: event.target.value});
    }

    const handleInputPassword = (event) => {
        setInput({...input, password: event.target.value});
    }
    
    const handleLogin = () => {
        console.log(input);
    }

    return (
        <Container className='login-container'>
            <header className='login-header form-text-color'>
                YOUTUBE ON RANDOM
            </header>

            <Form className='login-form'>
                <Form.Group className='login-input-wrapper'>
                    <Form.Control 
                        className='form-input-field'
                        type='text'
                        placeholder='Email or Username'
                        autoComplete='off'
                        value={input.username}
                        onChange={event => handleInputUsername(event)}
                    />
                </Form.Group>

                <Form.Group className='login-input-wrapper'>
                    <Form.Control 
                        className='form-input-field'
                        type='password'
                        placeholder='Password'
                        autoComplete='off'
                        value={input.password}
                        onChange={event => handleInputPassword(event)}
                    />
                </Form.Group>

                <Form.Group className='login-button-container'>
                    <Button
                        id='login-btn'
                        onClick={() => handleLogin()}
                    > 
                        Login
                    </Button>

                    <Form.Label className='login-signup'> Need an account?
                        <Link to='/register'> Sign up here </Link>
                    </Form.Label>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default Login;