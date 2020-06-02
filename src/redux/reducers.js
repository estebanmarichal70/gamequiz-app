import {combineReducers} from 'redux';
import authUser from './authUser/reducer';
import juegoModule from "./juego/reducers"

import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage
};

const rootReducer = combineReducers({
    authUser,
    juegoModule
});

export default persistReducer(persistConfig, rootReducer);