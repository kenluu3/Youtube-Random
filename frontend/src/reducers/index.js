import { combineReducers } from 'redux';

// reducers
import tagsReducer from './tagsReducer';

const rootReducer = combineReducers({
    tags: tagsReducer,
});

export default rootReducer;