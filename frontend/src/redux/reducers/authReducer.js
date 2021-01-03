const authReducer = (state = {}, action) => {
    switch(action.type) {
        case 'auth/LOGIN':
            return action.payload
        case 'auth/LOGOUT':
            return {}
        default: 
            return state;
    }
}

export default authReducer;
