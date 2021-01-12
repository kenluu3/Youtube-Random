import { postLogin } from '../../api-client';
import jwt_decode from 'jwt-decode';

export const login = (userInfo, successRedirect) => {
    return async (dispatch) => {
        try {
            let response = await postLogin(userInfo);            
            const { user, token } = response.data;

            const action = {
                type: 'auth/LOGIN',
                payload: { user: user, jwt: token }
            }
            localStorage.setItem('token', token);
            successRedirect(); // redirect to homepage.
            dispatch(action);
            
        } catch(err) { // error occurred don't need to dispatch acton.
            console.log('An error has occurred with login' + err.response.data);
        }
    }
}

export const loadJWT = (token) => {
    return (dispatch) => {
        const decoded = jwt_decode(token);
        const action = {
            type: 'auth/LOADJWT',
            payload: { user: decoded.username, jwt: token}
        };

        dispatch(action);
    }
}

export const logout = () => {
    return (dispatch) => {
        localStorage.clear(); // remove jwt from localStorage

        const action = {
            type: 'auth/LOGOUT'
        };

        dispatch(action);
    }
}

