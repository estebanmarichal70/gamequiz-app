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
/* ------------------------------------------------------ */

export * from "./authUser/actions";
export * from "./juego/actions";