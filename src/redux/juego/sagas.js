import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import gamequizServices from "../../api/gamequizServices";
import {CREAR_JUEGO, CREAR_PREGUNTA, crearPreguntaError, crearPreguntaSuccess, setSuccessMessage} from "../actions";
import {crearJuegoError, crearJuegoSuccess} from "./actions";


export function* watchCrearJuego() {
    yield takeEvery(CREAR_JUEGO, crearJuego);
}

const crearJuegoAsync = async (data) =>
    await gamequizServices.services.crearJuego(data)
        .then(response => response)
        .catch(error => error);


function* crearJuego({payload}) {
    try {
        const response = yield call(crearJuegoAsync, payload.juego);
        if (response.data) {
            if (!response.data.data.success) {
                let juego = response.data.data;
                yield put(crearJuegoSuccess(juego));
            } else {
                yield put(crearJuegoError(response.data.data.message));
            }
        } else {
            yield put(crearJuegoError(response));
        }
    } catch (error) {
        yield put(crearJuegoError(error));
    }
}


export function* watchCrearPregunta() {
    yield takeEvery(CREAR_PREGUNTA, crearPregunta);
}

const crearPreguntaAsync = async (data) =>
    await gamequizServices.services.crearPregunta(data)
        .then(response => response)
        .catch(error => error);

function* crearPregunta({payload}) {
    yield put(setSuccessMessage(null))
    yield put(crearPreguntaError(null))
    try {
        let response = yield call(crearPreguntaAsync, payload.pregunta)
        let pregunta = response.data.data;
        yield put(crearPreguntaSuccess({...pregunta, tmpId: payload.pregunta.tmpId}))
        yield put(setSuccessMessage(`Se ha creado la pregunta ${pregunta.Id} correctamente.`))
    } catch (error) {
        yield put(crearPreguntaError(error));
    }
}


export default function* rootSaga() {
    yield all([
        fork(watchCrearJuego),
        fork(watchCrearPregunta)
    ]);
}