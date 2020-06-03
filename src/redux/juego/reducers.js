import {
    AGREGAR_PREGUNTA_TMP,
    AGREGAR_VIDEO,
    CREAR_JUEGO,
    CREAR_JUEGO_ERROR,
    CREAR_JUEGO_SUCCESS,
    CREAR_PREGUNTA,
    CREAR_PREGUNTA_ERROR,
    CREAR_PREGUNTA_SUCCESS
} from '../actions';

import {REHYDRATE} from 'redux-persist/lib/constants';


const INIT_STATE = {
    error: null,
    juego: null,
    preguntas: {
        hasPreguntas: false,
        list: [{}, {}]
    }
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
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
            return {...state, preguntas: {hasPreguntas: true, list: [...state.preguntas.list, action.payload.pregunta]}}
        // esta accion agrega la pregunta que responde la API
        case CREAR_PREGUNTA_SUCCESS:
            return {...state, preguntas: {hasPreguntas: true, list: [...state.preguntas.list, action.payload.pregunta]}}
        case CREAR_PREGUNTA_ERROR:
            return {...state, error: action.payload.message}
        case AGREGAR_VIDEO:
            return {
                ...state,
                preguntas: {
                    ...state.preguntas,
                    list:
                        state.preguntas.list.map(pregunta => {
                            if (pregunta.tmpId == action.payload.tmpId) {
                                pregunta.video = action.payload.video;
                            }
                            return pregunta;
                        })
                }
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
