import axios from 'axios';

const BASE_URL = 'https://techtest.youapp.ai/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
