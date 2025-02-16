import axios from 'axios';

const apiUrl = "http://192.168.2.148:5002";

const api = axios.create({
  baseURL:'http://192.168.2.148',
  timeout:30000,
  headers:{'Accept':'application/json, text/plain, */*'}
});

export default {
  get_servers: () => api.get(`${apiUrl}/get_servers`),

  get_webhook: (data) => api.post(`${apiUrl}/get_webhook`, data),

  get_dealfields: (data) => api.post(`${apiUrl}/dealfields`, data),

  setdealfields: (data) => api.post(`${apiUrl}/setdealfields`, {'fields':data}),

  dealID:(data) => api.post(`${apiUrl}/dealID`, data),

  getDealList: (data) => api.post(`${apiUrl}/getDealList`, data),

  getDealIdBatch: (data) => api.post(`${apiUrl}/getDealIdLoad`, data), //Загрузка сделки по ID

  setDealIdBatch: (data) => api.post(`${apiUrl}/setDealIdLoad`, data), //Загрузка сделки по ID
}
