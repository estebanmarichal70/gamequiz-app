import { all } from 'redux-saga/effects';
import userSagas from "./authUser/saga";
import juegoSagas from "./juego/sagas"

export default function* rootSaga(getState) {
    yield all([
        userSagas(),
        juegoSagas()
    ]);
}
