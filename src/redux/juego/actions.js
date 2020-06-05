import {
    AGREGAR_PREGUNTA_TMP,
    AGREGAR_VIDEO,
    CREAR_JUEGO,
    CREAR_JUEGO_ERROR,
    CREAR_JUEGO_SUCCESS,
    CREAR_PREGUNTA,
    CREAR_PREGUNTA_ERROR,
    CREAR_PREGUNTA_SUCCESS,
    CREAR_RESPUESTA,
    CREAR_RESPUESTA_SUCCESS,
    RESET_CREACION_JUEGO,
    SET_ERROR_MESSAGE,
    SET_SUCCESS_MESSAGE
} from '../actions';


export const resetCreacionJuego = () => ({
    type: RESET_CREACION_JUEGO,
    payload: {}
})

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

export const agregarVideo = (video, tmpId) => ({
    type: AGREGAR_VIDEO,
    payload: {video, tmpId}
})

export const agregarPreguntaTemporal = (pregunta) => ({
    type: AGREGAR_PREGUNTA_TMP,
    payload: {pregunta}
})

export const setSuccessMessage = (success) => ({
    type: SET_SUCCESS_MESSAGE,
    payload: {success}
})

export const crearRespuesta = (respuesta) => ({
    type: CREAR_RESPUESTA,
    payload: {respuesta}
});

export const setErrorMessage = (error) => ({
    type: SET_ERROR_MESSAGE,
    payload: {error}
})

export const crearRespuestaSuccess = (respuesta) => ({
    type: CREAR_RESPUESTA_SUCCESS,
    payload: {respuesta}
});