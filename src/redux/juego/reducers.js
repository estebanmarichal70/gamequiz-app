import {CREAR_JUEGO, CREAR_JUEGO_ERROR, CREAR_JUEGO_SUCCESS} from '../actions';


const INIT_STATE = {
    error: null,
    juego: null
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CREAR_JUEGO:
            return {...state, error: ''};
        case CREAR_JUEGO_SUCCESS:
            return {...state, juego: action.payload.user, error: ''};
        case CREAR_JUEGO_ERROR:
            return {...state, user: '', error: action.payload.message};
        default:
            return {...state};
    }
}
