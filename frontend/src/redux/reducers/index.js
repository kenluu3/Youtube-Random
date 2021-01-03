import { combineReducers } from 'redux';

// reducers
import tagsReducer from './tagsReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    tags: tagsReducer,
    auth: authReducer
});

export default rootReducer;