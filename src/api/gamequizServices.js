import axios from "axios";

import {API_URL} from "../constants/constants";

let addDefaultHeaders = () => {
    axios.defaults.headers.common['Authorization'] = "Bearer " + JSON.parse(localStorage.getItem('access_token'));
}

export default {
    services: {
        registrar(data) {
            return axios.post(API_URL + "/registrar", data);
        },
        login(params) {
            return axios.post(API_URL + "/acceder", params);
        },
        crearJuego(params){
            return axios.post(API_URL + "/juego", params);
        }
    }
}