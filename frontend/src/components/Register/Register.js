import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useHistory } from 'react-router-dom';
import { postRegister } from '../../api-client';
import './register.css';

function Register() {

    const initialState = {
        username: '',
        name: '',
        email: '',
        password: ''
    };

    const [user, setUser] = useState(initialState);
    const history = useHistory();

    const handleInput= (event) => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    }

    const handleRegister = async () => {
        let validInputs = true;
        const fields = Object.keys(user);
        fields.forEach(field => {
            if (user[field] === '') {
                return validInputs = false;
            }
        });

        if (validInputs) { 
            try {
            const response = await postRegister(user);
            console.log(JSON.stringify(response.data));
            history.push('/login');
            } catch (err) {
                const response = err.response.data; // error response from server.
                console.log('error has occurred: ' + response.message);
            }
        }
        
    }

    return(
        <Container className='register-container'>
            <header className='register-header form-text-color'>
                CREATE ACCOUNT
            </header>
            
            <Form className='form-padding'>
                <Form.Group className='register-input-wrapper'>
                    <Form.Control 
                        className='form-input-field'
                        type='text'
                        name='name'
                        placeholder='Name'
                        autoComplete='off'
                        value={user.name}
                        onChange={event => handleInput(event)}
                    />  
                </Form.Group>

                <Form.Group className='register-input-wrapper'>
                    <Form.Control 
                        className='form-input-field'
                        type='text'
                        name='username'
                        placeholder='Username'
                        autoComplete='off'
                        value={user.username}
                        onChange={event => handleInput(event)}
                    />  
                </Form.Group>

                <Form.Group className='register-input-wrapper'>
                    <Form.Control 
                        className='form-input-field'
                        type='text'
                        name='email'
                        placeholder='Email'
                        autoComplete='off'
                        value={user.email}
                        onChange={event => handleInput(event)}
                    />  
                </Form.Group>

                <Form.Group className='register-input-wrapper'>
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

                <Button 
                    block
                    id='register-btn'
                    onClick={() => handleRegister()}
                    variant='success'
                >
                    SIGN UP
                </Button>
            </Form>
        </Container>
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