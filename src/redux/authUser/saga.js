import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import {LOGIN_USER, LOGOUT_USER, logoutUser, REGISTER_USER, registerUserSuccess,} from '../actions';

import {loginUserError, loginUserSuccess, registerUserError,} from './actions';

import gamequizServices from "../../api/gamequizServices";


export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (username, password) =>
    await gamequizServices.services.login({username, password})
        .then(authUser => authUser);


function* loginWithEmailPassword({payload}) {
    const {username, password} = payload.user;
    const {history} = payload;
    try {
        const response = yield call(loginWithEmailPasswordAsync, username, password);

        let user = response.data.data.user;
        let token = response.data.data.token;

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', JSON.stringify(token));


        yield put(loginUserSuccess(user, token));

        history.push("/usuario/perfil");
    } catch (error) {
        yield put(loginUserError(error));
    }
}


export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (payload) =>
    await gamequizServices.services.registrar({...payload})
        .then(authUser => authUser);

function* registerWithEmailPassword({payload}) {
    yield put(registerUserSuccess(''));
    yield put(registerUserError(''));
    const {history} = payload
    try {
        yield call(registerWithEmailPasswordAsync, payload.user);
        /*if (registerUser.data) {
            if (!registerUser.data.data.success) {*/
        yield put(registerUserSuccess("Se ha registrado el usuario correctamente."));
        setTimeout(() => history.push('/usuario/login'), 3000)
        /*} else {
            yield put(registerUserError(registerUser.message));
        }
    } else {
        yield put(registerUserError(registerUser.message));
    }*/
    } catch (error) {
        yield put(registerUserError(error));
    }
}


export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

// eslint-disable-next-line
function* logout({payload}) {
    const {history} = payload;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    history.push("/");
}


export default function* rootSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
    ]);
}