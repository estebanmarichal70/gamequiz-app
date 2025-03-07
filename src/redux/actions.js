// ACCIONES DE AUTENTICACION ------------------------------- */
export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";

export const REGISTER_USER = "REGISTER_USER";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_ERROR = "REGISTER_USER_ERROR";

export const LOGOUT_USER = "LOGOUT_USER";


/* ------------------------------------------------------ */
// ACCIONES DE JUEGO
export const RESET_CREACION_JUEGO = "RESET_CREACION_JUEGO";

export const RESET_VIDEO = "RESET_VIDEO";


export const CREAR_JUEGO = "CREAR_JUEGO";
export const CREAR_JUEGO_ERROR = "CREAR_JUEGO_ERROR"
export const CREAR_JUEGO_SUCCESS = "CREAR_JUEGO_SUCCESS";

export const SET_SUCCESS_MESSAGE = "SET_SUCCESS_MESSAGE";
export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";

export const AGREGAR_PREGUNTA_TMP = "AGREGAR_PREGUNTA_TMP";

export const CREAR_PREGUNTA = "CREAR_PREGUNTA";
export const CREAR_PREGUNTA_SUCCESS = "CREAR_PREGUNTA_SUCCESS";
export const CREAR_PREGUNTA_ERROR = "CREAR_PREGUNTA_ERROR";

export const CREAR_RESPUESTA = "CREAR_RESPUESTA";
export const CREAR_RESPUESTA_SUCCESS = "CREAR_RESPUESTA_SUCCESS";

export const AGREGAR_VIDEO = "AGREGAR_VIDEO";
/* ------------------------------------------------------ */

export * from "./authUser/actions";
export * from "./juego/actions";