const baseUrl = 'http://localhost:44365'
const basePath = '/api'
const apiUrl = baseUrl + basePath

let axios = require("axios");

/*let addDefaultHeaders = () => {
  axios.defaults.headers.common['Authorization'] = "Bearer " + JSON.parse(localStorage.getItem('access_token'));
}*/

module.exports = {
  services: {
    registrar(data) {
      return axios.post(apiUrl + "/registrar", data);
    }
  }
}