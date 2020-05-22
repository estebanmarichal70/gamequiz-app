import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import {LOGIN_USER, LOGOUT_USER, REGISTER_USER,} from '../actions';

import {loginUserError, loginUserSuccess, registerUserError, registerUserSuccess,} from './actions';

import gamequizServices from "../../api/gamequizServices";


export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (username, password) =>
    await gamequizServices.services.login({username, password})
        .then(authUser => authUser)
        .catch(error => error);


function* loginWithEmailPassword({payload}) {
    const {username, password} = payload.user;
    const {history} = payload;
    try {
        const response = yield call(loginWithEmailPasswordAsync, username, password);
        if(response.data) {
            if (!response.data.data.success) {
                let user = response.data.data.user;
                let token = response.data.data.token;

                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', JSON.stringify(token));

                yield put(loginUserSuccess(user, token));
                history.push('/');
            } else {
                yield put(loginUserError(response.data.data.message));
            }
        }else{
            yield put(loginUserError(response));
        }
    } catch (error) {
        yield put(loginUserError(error));
    }
}


export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (email, password) =>
    await gamequizServices.services.registrar(email, password)
        .then(authUser => authUser)
        .catch(error => error);

function* registerWithEmailPassword({payload}) {
    const {email, password} = payload.user;
    //const { history } = payload
    try {
        const registerUser = yield call(registerWithEmailPasswordAsync, email, password);
        if (!registerUser.message) {
            localStorage.setItem('user', registerUser.user.uid);
            yield put(registerUserSuccess(registerUser));
            // history.push('/')
        } else {
            yield put(registerUserError(registerUser.message));

        }
    } catch (error) {
        yield put(registerUserError(error));
    }
}


export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

// eslint-disable-next-line
function* logout({payload}) {
    try {
        localStorage.removeItem('user');
    } catch (error) {
    }
}


export default function* rootSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
    ]);
}