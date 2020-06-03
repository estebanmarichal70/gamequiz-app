import {combineReducers} from 'redux';
import authUser from './authUser/reducer';
import juegoModule from "./juego/reducers"


const rootReducer = combineReducers({
    authUser,
    juegoModule
});

export default rootReducer;