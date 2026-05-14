import axios from 'axios';

const api = axios.create({
  // Use VITE_API_URL environment variable in production, fallback to local proxy
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Request interceptor for adding the JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
