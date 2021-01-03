import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './register.css';

function Register() {

    const initialState = {
        username: '',
        name: '',
        email: '',
        password: ''
    };

    const [user, setUser] = useState(initialState);


    return(
        <h1>Register</h1>
    );
}



/*
class Register extends Component {

    render() {
        return (
            <Container className='register-container'>
                <header className='text-center register-header form-header'>Register</header>

                <Form className='register-form'>    

                    <Form.Group className='register-input-wrapper'>
                        <Form.Control className='form-input' name='name' type='text' placeholder='Name'></Form.Control>
                    </Form.Group>

                    <Form.Group className='register-input-wrapper'>
                        <Form.Control className='form-input' name='email' type='text' placeholder='Email'></Form.Control>
                    </Form.Group>

                    <Form.Group className='register-input-wrapper'>
                        <Form.Control className='form-input' name='username' type='text' placeholder='Username'></Form.Control>
                    </Form.Group>

                    <Form.Group className='register-input-wrapper'>
                        <Form.Control className='form-input' name='password' type='password' placeholder='Password'></Form.Control>
                    </Form.Group>

                    <Button id='register-btn' variant='success'>Register</Button>

                </Form>
            </Container>
        );
    }
}

*/


export default Register;