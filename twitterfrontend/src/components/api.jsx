import axios from "axios"

const api = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true,
});
api.interceptors.request.use(
  (config) => {
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

  export default api;

