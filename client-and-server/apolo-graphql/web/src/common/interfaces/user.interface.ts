export default interface User {
  _id: string;
  name: string;
  phone: string;
  email: string;
}

export interface UsersResponse {
  users: User[];
}
