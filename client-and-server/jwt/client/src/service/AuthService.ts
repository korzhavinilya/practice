import { AxiosResponse } from 'axios';
import api from '../http';
import { AuthResponse } from '../models/AuthResponse';

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/api/auth/login', { email, password });
  }

  static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/api/auth/registration', {
      email,
      password,
    });
  }

  static async logout(): Promise<void> {
    return api.post('/api/auth/logout');
  }
}
