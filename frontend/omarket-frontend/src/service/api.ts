import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.0.163:8080', 
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;