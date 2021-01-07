import { postLogin } from '../../api-client';

export const login = (fieldInputs) => {
    return async (dispatch) => {
        try {
            let response = await postLogin(fieldInputs);
            console.log(response);
            const { user, token } = response.data;

            const action = {
                type: 'auth/LOGIN',
                payload: { user: user }
            }
            localStorage.setItem('access_token', token);
            dispatch(action);
        } catch(err) { // error occurred don't need to dispatch acton.
            console.log(err);
        }
    }
}

export const logout = () => {
    return {
        type: 'auth/LOGOUT'
    }
}

