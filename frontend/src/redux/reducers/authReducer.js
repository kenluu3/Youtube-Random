const initialState = {
    user: '',
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'auth/LOGIN':
            return action.payload
        case 'auth/LOADUSER':
            return {user: action.payload.user}
        case 'auth/LOGOUT':
            return {user: ''}
        default:
            return state
    }
}

export default authReducer;