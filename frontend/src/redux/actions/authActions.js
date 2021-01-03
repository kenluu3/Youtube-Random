import { postLogin } from '../api-client';

export const login = (user) => {

}

export const logout = () => {
    return {
        type: 'auth/LOGOUT'
    }
}

