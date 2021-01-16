import { postLogin } from '../../api-client';
import jwt_decode from 'jwt-decode';

export const login = (userInfo, successRedirect) => {
    return async (dispatch) => {
        try {
            let response = await postLogin(userInfo);            
            const { user, token } = response.data;

            const action = {
                type: 'auth/LOGIN',
                payload: { user: user }
            }
            localStorage.setItem('token', token);
            successRedirect(); // redirect to homepage.
            dispatch(action);
            
        } catch(err) { // error occurred don't need to dispatch acton.
            console.log('An error has occurred with login' + err);
            const action = { 
                type: 'auth/LOGOUT'
            };

            dispatch(action);
        }
    }
}

export const loadUser = (token) => {
    return (dispatch) => {
        const decoded = jwt_decode(token);

        if (Date.now() <= decoded.exp * 1000) { // ensure jwt is still valid
            const action = {
                type: 'auth/LOADUSER',
                payload: { user: decoded.username }
            };
            dispatch(action);
        } else { // expired jwt
            localStorage.clear(); 
            const action = { 
                type: 'auth/LOGOUT'
            };

            dispatch(action);
        }
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

