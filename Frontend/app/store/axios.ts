import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000', // your backend
  withCredentials: true, // important for cookies (access/refresh tokens)
});

export default api;
