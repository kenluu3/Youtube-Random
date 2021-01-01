const authReducer = (state = {}, action) => {
    switch(action.type) {
        case 'auth/LOGIN':
            return 'login'
        case 'auth/LOGOUT':
            return 'logout'
        default: 
            return state;
    }
}

export default authReducer;
