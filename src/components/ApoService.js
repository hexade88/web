import axios from 'axios';

const apiUrl = "http://localhost:5002";

const api = axios.create({
  baseURL:'http://localhost',
  timeout:100000,
  headers:{'Accept':'application/json, text/plain, */*'}
});

export default {
  get_servers: () => api.get(`${apiUrl}/get_servers`),

  get_webhook: (data) => api.post(`${apiUrl}/get_webhook`, data),

  get_dealfields: (data) => api.post(`${apiUrl}/dealfields`, data),

  setdealfields: (data) => api.post(`${apiUrl}/setdealfields`, {'fields':data}),

}
