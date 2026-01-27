import axios, { AxiosError } from 'axios';
import { authService } from './AuthService';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Проверяем 401 и флаг _retry (чтобы не зациклить)
    if (error.response?.status === 401 && !(originalRequest as any)._retry) {
      
      // Вызываем логику AuthService
      // Важно: await здесь "замораживает" ответ axios для вызывающего кода
      const canRetry = await authService.handleUnauthorizedError(error);

      if (canRetry) {
        // Если вернулось true, значит токен обновлен, повторяем запрос
        console.log(`%c[Axios] Повтор запроса #${(originalRequest.params as any)?.id}`, 'color: teal');
        
        // Обычно здесь мы еще обновляем заголовок Authorization новым токеном:
        // originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
        
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);