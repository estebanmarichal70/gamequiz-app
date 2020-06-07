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
            addDefaultHeaders();
            return axios.get(API_URL + "/usuario/" + id);
        },
        //--------------------------//
        crearJuego(params) {
            addDefaultHeaders();
            return axios.post(API_URL + "/juego", params);
        },
        crearPregunta(data) {
            addDefaultHeaders();
            return axios.post(API_URL + "/pregunta", data);
        },

        crearRespuesta(data) {
            addDefaultHeaders();
            return axios.post(API_URL + "/respuesta", data);
        },
        cambiarEstado(id) {
            addDefaultHeaders();
            return axios.post(API_URL + "/juego/cambiar_estado/" + id);
        },
        aumentarSelRespuesta(id) {
            addDefaultHeaders();
            return axios.post(API_URL + "/respuesta/aumentar/" + id);
        },
        fetchJuegoData(nombre) {
            addDefaultHeaders();
            return axios.get(API_URL + "/juego?nombre=" + nombre);
        },
        fetchJuegoUuid(Uuid) {
            addDefaultHeaders();
            return axios.get(API_URL + "/juego/Uuid/" + Uuid);
        },
        fetchPreguntaActualizada(id) {
            addDefaultHeaders();
            return axios.get(API_URL + `/pregunta/${id}`)
        }

    }
}