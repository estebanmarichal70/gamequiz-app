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

import {REHYDRATE} from 'redux-persist/lib/constants';


const INIT_STATE = {
    error: null,
    juego: null,
    preguntas: {
        hasPreguntas: false,
        list: []
    },
    success: null
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case RESET_CREACION_JUEGO:
            return {...state, error: null, juego: null, preguntas: {hasPreguntas: false, list: []}, success: null}
        case CREAR_JUEGO:
            return {...state, error: ''};
        case CREAR_JUEGO_SUCCESS:
            return {...state, juego: action.payload.juego, error: ''};
        case CREAR_JUEGO_ERROR:
            return {...state, user: '', error: action.payload.message};
        case CREAR_PREGUNTA:
            return {...state, error: ''}
        // esta accion agrega la pregunta al array pero todavia no sea a creado en el backend
        case AGREGAR_PREGUNTA_TMP:
            if (state.preguntas.list.find(pregunta => pregunta.tmpId === action.payload.pregunta.tmpId)) {
                return {
                    ...state,
                    preguntas: {
                        hasPreguntas: true,
                        list: [...state.preguntas.list.filter(pregunta => pregunta.tmpId !== action.payload.pregunta.tmpId), action.payload.pregunta]
                    }
                }
            } else {
                return {
                    ...state,
                    preguntas: {hasPreguntas: true, list: [...state.preguntas.list, action.payload.pregunta]}
                }
            }
        // esta accion agrega la pregunta que responde la API
        case CREAR_PREGUNTA_SUCCESS:
            if (state.preguntas.list.find(pregunta => pregunta.tmpId === action.payload.pregunta.tmpId)) {
                return {
                    ...state,
                    preguntas: {
                        hasPreguntas: true,
                        list: [...state.preguntas.list.filter(pregunta => pregunta.tmpId !== action.payload.pregunta.tmpId), action.payload.pregunta]
                    }
                }
            } else {
                return {
                    ...state,
                    preguntas: {hasPreguntas: true, list: [...state.preguntas.list, action.payload.pregunta]}
                }
            }
        case CREAR_PREGUNTA_ERROR:
            return {...state, error: action.payload.message, success: null}
        case SET_SUCCESS_MESSAGE:
            return {...state, success: action.payload.success, error: null}
        case SET_ERROR_MESSAGE:
            return {...state, error: action.payload.error, success: null}
        case AGREGAR_VIDEO:
            return {
                ...state,
                preguntas: {
                    ...state.preguntas,
                    list:
                        state.preguntas.list.map(pregunta => {
                            if (pregunta.tmpId === action.payload.tmpId) {
                                pregunta.video = action.payload.video;
                            }
                            return pregunta;
                        })
                }
            }
        case CREAR_RESPUESTA:
            return {...state, error: null, success: null};
        case CREAR_RESPUESTA_SUCCESS:
            return {
                ...state,
                preguntas: {
                    hasPreguntas: true,
                    list: [...state.preguntas.list.map(pregunta => {
                        if (pregunta.tmpId === action.payload.respuesta.tmpId) {
                            pregunta.Respuestas.push(action.payload.respuesta);
                        }
                        return pregunta;
                    })]
                },
                error: null
            }
        case REHYDRATE:
            if (action.payload) {
                return {
                    ...action.payload.juegoModule,
                };
            } else {
                return state;
            }
        default:
            return {...state};
    }
}
