import axios, { AxiosHeaders } from 'axios';
import { AuthResponse } from '../models/AuthResponse';

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const headers = config.headers as AxiosHeaders;
  headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const prevRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      prevRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(
          `${process.env.REACT_APP_API_URL}/api/auth/refresh`,
          { withCredentials: true }
        );
        localStorage.setItem('token', response.data.accessToken);

        return api.request(prevRequest);
      } catch (error) {
        console.log("User isn't authorized - interceptor");
      }
    }

    throw error;
  }
);

export default api;
