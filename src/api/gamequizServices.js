import axios from "axios";

import {API_URL} from "../constants/constants";

let addDefaultHeaders = () => {
    axios.defaults.headers.common['Authorization'] = "Bearer " + JSON.parse(localStorage.getItem('token'));
}

export default {
    services: {
        //----------Usuario----------//
        registrar(data) {
            return axios.post(API_URL + "/registrar", data);
        },
        login(params) {
            return axios.post(API_URL + "/acceder", params);
        },
        fetchUserData() {
            addDefaultHeaders();
            return axios.get(API_URL + "/me");
        },
        fetchCreadorData(id) {
            return axios.get(API_URL + "/usuario/" + id);
        },
        //--------------------------//
        crearJuego(params) {
            addDefaultHeaders();
            return axios.post(API_URL + "/juego", params);
        },
        fetchJuegoIdData(id) {
            return axios.get(API_URL + "/juego/" + id);
        },
        fetchJuegos(nombre) {
            return axios.get(API_URL + "/juego?nombre=" + nombre);
        },
        fetchJuegoUuid(Uuid) {
            return axios.get(API_URL + "/juego/Uuid/" + Uuid);
        },
        cambiarEstado(id) {
            addDefaultHeaders();
            return axios.post(API_URL + "/juego/cambiar_estado/" + id);
        },
        aumentarJugados(id) {
            return axios.post(API_URL + "/juego/aumentarJugados/" + id);
        },
        crearPregunta(data) {
            addDefaultHeaders();
            return axios.post(API_URL + "/pregunta", data);
        },
        fetchPreguntaActualizada(id) {
            addDefaultHeaders();
            return axios.get(API_URL + `/pregunta/${id}`)
        },
        crearRespuesta(data) {
            addDefaultHeaders();
            return axios.post(API_URL + "/respuesta", data);
        },
        aumentarSelRespuesta(id) {
            return axios.post(API_URL + "/respuesta/aumentar/" + id);
        },
        //----------Puntaje----------//
        agregarPuntaje(data) {
            addDefaultHeaders();
            return axios.post(API_URL + "/puntaje/", data );
        },
        //--------------------------//
    }
}