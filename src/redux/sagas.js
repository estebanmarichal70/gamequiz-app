import { all } from 'redux-saga/effects';
import userSagas from "./authUser/saga";

export default function* rootSaga(getState) {
    yield all([
        userSagas()
    ]);
}
