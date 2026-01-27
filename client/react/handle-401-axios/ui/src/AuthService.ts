import axios, { AxiosError } from 'axios';

// Типизация элемента очереди
interface FailedRequest {
  resolve: (value: boolean) => void;
  reject: (reason?: any) => void;
}

class AuthService {
  private isRefreshingJwt = false;
  private failedQueue: FailedRequest[] = [];

  // Эмуляция метода обновления токена
  public async refreshJwtToken(): Promise<string | null> {
    console.log(
      '%c[AuthService] Запрос на обновление токена...',
      'color: orange'
    );
    try {
      const response = await axios.post('http://localhost:3000/api/refresh');
      console.log('%c[AuthService] Токен успешно обновлен!', 'color: green');
      return response.data.accessToken;
    } catch (error) {
      console.error('[AuthService] Ошибка обновления токена');
      return null;
    }
  }

  // Главная логика обработки 401
  public async handleUnauthorizedError(error: AxiosError): Promise<boolean> {
    const originalRequest = error.config;
    const requestId = (originalRequest?.params as any)?.id || 'unknown';

    console.log(
      `%c[AuthService] Обработка 401 для запроса #${requestId}`,
      'color: red'
    );

    // Если токен УЖЕ обновляется кем-то другим -> встаем в очередь
    if (this.isRefreshingJwt) {
      console.log(
        `%c[Queue] Запрос #${requestId} добавлен в очередь ожидания`,
        'color: gray'
      );

      try {
        const canRetry = await new Promise<boolean>((resolve, reject) => {
          this.failedQueue.push({ resolve, reject });
        });

        console.log(
          `%c[Queue] Запрос #${requestId} извлечен из очереди (Token Refreshed)`,
          'color: blue'
        );
        return canRetry;
      } catch (err) {
        return false;
      }
    }

    // Если мы первые, кто получил 401 -> запускаем процесс обновления
    (originalRequest as any)._retry = true;
    this.isRefreshingJwt = true;

    const newAccessToken = await this.refreshJwtToken();

    if (newAccessToken) {
      // Токен обновлен: обрабатываем очередь и разрешаем текущий запрос
      this.isRefreshingJwt = false;
      this.processFailedQueue(null, newAccessToken);
      return true; // Разрешаем retry для инициатора
    } else {
      // Не удалось обновить
      this.isRefreshingJwt = false;
      this.processFailedQueue(new Error('Unable to refresh token'));
      this.logout();
      return false;
    }
  }

  // Разбор очереди
  private processFailedQueue(error: Error | null, token: string | null = null) {
    console.log(
      `%c[Queue] Обработка очереди из ${this.failedQueue.length} запросов...`,
      'color: purple'
    );

    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        // Резолвим промис, который держит выполнение handleUnauthorizedError
        prom.resolve(true);
      }
    });

    this.failedQueue = [];
  }

  public logout() {
    console.warn('[AuthService] Logout performed');
  }

  // Хелпер для теста: сбросить токен на сервере
  public async resetServerToken() {
    await axios.post('http://localhost:3000/api/reset');
    console.log(
      '%c[Test] Токен на сервере сброшен (теперь он невалиден)',
      'color: black; background: yellow'
    );
  }
}

export const authService = new AuthService();
