import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://127.0.0.1:3333/',
  baseURL: 'http://18.229.160.116:3000/'// prod
});


export default api;
