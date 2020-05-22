import { combineReducers } from 'redux';
import authUser from './authUser/reducer';

const rootReducer = combineReducers({
    authUser
});

export default rootReducer;