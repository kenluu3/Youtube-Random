const initialState = {
    user: '',
    jwt: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'auth/LOGIN':
            return action.payload
        case 'auth/LOADJWT':
            return {user: action.payload.user, jwt: action.payload.jwt}
        case 'auth/LOGOUT':
            return {jwt: ''}
        default:
            return state
    }
}

export default authReducer;