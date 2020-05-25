import {
    LOGIN_USER,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
} from '../actions';

export const loginUser = (user, history) => ({
    type: LOGIN_USER,
    payload: {user, history}
});

export const loginUserSuccess = (user, token) => ({
    type: LOGIN_USER_SUCCESS,
    payload: {user, token}
});

export const loginUserError = (message) => {
    return {
        type: LOGIN_USER_ERROR,
        payload: {message}
    }
};

export const registerUser = (user, history) => ({
    type: REGISTER_USER,
    payload: {user, history}
});

export const registerUserSuccess = (success_message) => ({
    type: REGISTER_USER_SUCCESS,
    payload: {success_message}
});

export const registerUserError = (message) => ({
    type: REGISTER_USER_ERROR,
    payload: {message}
});

export const logoutUser = (history) => ({
    type: LOGOUT_USER,
    payload: {history}
});