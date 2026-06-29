import axios, { AxiosInstance } from 'axios';

let instance: AxiosInstance;

export const getInstance = (): AxiosInstance => {
  if (!instance) {
    instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: { 'Content-Type': 'application/json' },
    });

    // interceptor para agregar Bearer token
    instance.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });
  }

  return instance;
};
