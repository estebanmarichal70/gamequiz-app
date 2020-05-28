import {CREAR_JUEGO, CREAR_JUEGO_ERROR, CREAR_JUEGO_SUCCESS} from '../actions';

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

