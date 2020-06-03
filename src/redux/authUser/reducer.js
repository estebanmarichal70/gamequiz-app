import {
    LOGIN_USER,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
} from '../actions';

import {REHYDRATE} from 'redux-persist/lib/constants';


const INIT_STATE = {
    user: null,
    error: '',
    token: null,
    success_message: ''
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, error: ''};
        case LOGIN_USER_SUCCESS:
            return {...state, user: action.payload.user, token: action.payload.token, error: ''};
        case LOGIN_USER_ERROR:
            return {...state, user: '', error: action.payload.message};
        case REGISTER_USER:
            return {...state, error: ''};
        case REGISTER_USER_SUCCESS:
            return {...state, success_message: action.payload.success_message, error: ''};
        case REGISTER_USER_ERROR:
            return {...state, user: '', error: action.payload.message};
        case LOGOUT_USER:
            return {...state, user: null, token: null, error: ''};
        case REHYDRATE:
            if (action.payload) { // <- I guess this works, but it's kinda ugly
                return {
                    ...action.payload.authUser,
                };
            } else {
                return state;
            }
        default:
            return {...state};
    }
}
