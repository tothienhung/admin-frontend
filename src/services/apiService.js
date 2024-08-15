import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      // Handle token expiration or unauthorized access
      // E.g., redirect to login page or refresh token
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  login: (data) => apiClient.post('/api/auth/signin', data),
  // Other API methods like register, getProfile can be added here
};
