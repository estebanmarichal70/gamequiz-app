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
export const CREAR_JUEGO = "CREAR_JUEGO";
export const CREAR_JUEGO_ERROR = "CREAR_JUEGO_ERROR"
export const CREAR_JUEGO_SUCCESS = "CREAR_JUEGO_SUCCESS";

export const AGREGAR_PREGUNTA_TMP = "AGREGAR_PREGUNTA_TMP";

export const CREAR_PREGUNTA = "CREAR_PREGUNTA";
export const CREAR_PREGUNTA_SUCCESS = "CREAR_PREGUNTA_SUCCESS";
export const CREAR_PREGUNTA_ERROR = "CREAR_PREGUNTA_ERROR";

export const AGREGAR_VIDEO = "AGREGAR_VIDEO";
/* ------------------------------------------------------ */

export * from "./authUser/actions";
export * from "./juego/actions";