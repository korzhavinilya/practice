const url = import.meta.env.VITE_BACKEND_URL;

export default class UserService {
  static async getAuthUser() {
    const response = await fetch(url + '/v1/auth/me', {
      credentials: 'include'
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`${response.status} ${data.message}`);
    }

    return data.user;
  }

  static async login(username: string, password: string) {
    const response = await fetch(url + '/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`${response.status} ${data.message}`);
    }

    return data.user;
  }

  static async signup(username: string, password: string) {
    const response = await fetch(url + '/v1/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`${response.status} ${data.message}`);
    }

    return data.user;
  }

  static async logout() {
    const response = await fetch(url + '/v1/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`${response.status} ${data.message}`);
    }

    return data.user;
  }
}
