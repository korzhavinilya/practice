import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { AuthResponse } from '../models/AuthResponse';
import { User } from '../models/User';
import AuthService from '../service/AuthService';

export default class Store {
  user = {} as User;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(isAuth: boolean) {
    this.isAuth = isAuth;
  }

  setUser(user: User) {
    this.user = user;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as User);
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  }

  async checkAuth() {
    this.isLoading = true;
    try {
      const response = await axios.get<AuthResponse>(
        `${process.env.REACT_APP_API_URL}/api/auth/refresh`,
        { withCredentials: true }
      );
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error: any) {
      console.log(error.response?.data?.message);
    } finally {
      this.isLoading = false;
    }
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }
}
