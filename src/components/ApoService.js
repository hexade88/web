import axios from 'axios';

const apiUrl = "http://localhost:5002";

const api = axios.create({
  baseURL:'http://localhost',
  timeout:1000,
  headers:{'Accept':'application/json, text/plain, */*'}
});

export default {
  get_servers: () => api.get(`${apiUrl}/get_servers`),

  get_webhook: (data) => api.post(`${apiUrl}/get_webhook`, data),

}
