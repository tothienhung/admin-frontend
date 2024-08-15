import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const registerClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerService = {
  register: (data) => registerClient.post('/api/auth/signup', data),
};
