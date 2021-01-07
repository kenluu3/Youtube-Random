import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Link, useHistory } from 'react-router-dom';
import { postLogin } from '../../api-client';

import './login.css'; 

function Login() {

    const history = useHistory();
    const initialState = {
        username: '',
        password: ''
    }

    const [user, setUser] = useState(initialState);

    const handleInput = (event) => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    }

    const handleLogin = async () => {
        try {
            let response = await postLogin(user);
            if (response.status) {
                localStorage.setItem('token', response.data.token);
                history.push('/home'); // redirect to homepage
            }
        } catch(err) {
            const message = err.response;
            if (message !== undefined) {
                console.log(JSON.stringify(message));
            }
        }
    }

    return (
        <Container className='login-container'>
            <header className='login-header form-text-color'>
                YOUTUBE ON RANDOM
            </header>

            <Form className='form-padding'>
                <Form.Group className='login-input-wrapper'>
                    <Form.Control 
                        className='form-input-field'
                        type='text'
                        name='username'
                        placeholder='Email or Username'
                        autoComplete='off'
                        value={user.username}
                        onChange={event => handleInput(event)}
                    />
                </Form.Group>

                <Form.Group className='login-input-wrapper'>
                    <Form.Control 
                        className='form-input-field'
                        type='password'
                        name='password'
                        placeholder='Password'
                        autoComplete='off'
                        value={user.password}
                        onChange={event => handleInput(event)}
                    />
                </Form.Group>

                <Form.Group className='login-button-container'>
                    <Button
                        id='login-btn'
                        block
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