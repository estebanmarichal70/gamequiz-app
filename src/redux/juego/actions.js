import {
    CREAR_JUEGO,
    CREAR_JUEGO_ERROR,
    CREAR_JUEGO_SUCCESS,
    CREAR_PREGUNTA,
    CREAR_PREGUNTA_ERROR,
    CREAR_PREGUNTA_SUCCESS
} from '../actions';

export const crearJuego = (juego, history) => ({
    type: CREAR_JUEGO,
    payload: {juego, history}
});

export const crearJuegoSuccess = (juego) => ({
    type: CREAR_JUEGO_SUCCESS,
    payload: {juego}
});

export const crearJuegoError = (message) => ({
    type: CREAR_JUEGO_ERROR,
    payload: {message}
});

export const crearPregunta = (pregunta) => ({
    type: CREAR_PREGUNTA,
    payload: {pregunta}
});

export const crearPreguntaSuccess = (pregunta) => ({
    type: CREAR_PREGUNTA_SUCCESS,
    payload: {pregunta}
});

export const crearPreguntaError = (message) => ({
    type: CREAR_PREGUNTA_ERROR,
    payload: {message}
});
