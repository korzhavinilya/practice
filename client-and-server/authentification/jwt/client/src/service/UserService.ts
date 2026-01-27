import { AxiosResponse } from 'axios';
import api from '../http';
import { User } from '../models/User';

export default class UserService {
  static async fetchUsers(): Promise<AxiosResponse<User[]>> {
    return api.get<User[]>('/api/users');
  }
}
