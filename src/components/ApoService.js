import axios from 'axios';

const apiUrl = "http://192.168.0.148:5002";

const api = axios.create({
  baseURL:'http://192.168.0.148',
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
  updDealIdLoad: (data) => api.post(`${apiUrl}/updDealIdLoad`, data), //Обновить сделку по ID

  getCompanyList: (data) => api.post(`${apiUrl}/getCompanyList`, data), //Загрузка списка компаний по 50
  setCompany: (data) => api.post(`${apiUrl}/setCompany`, data),         //Сохранение списка компаний
  getCompanyID: (data) => api.post(`${apiUrl}/getCompanyID`, data),

  getContactList: (data) => api.post(`${apiUrl}/getContactList`, data), //Загрузка списка контактов по 50
  getContactID: (data) => api.post(`${apiUrl}/getContactID`, data),
  setContact: (data) => api.post(`${apiUrl}/setContact`, data),

  getAllDealNewBX: (data) => api.post(`${apiUrl}/getAllDealNewBX`, data),    //Загрузка всех сделок нового битрикса для правок
}
