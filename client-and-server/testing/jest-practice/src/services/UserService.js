const axios = require('axios');

class UserService {
  static findAll() {
    return axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.data);
  }
}

module.exports = UserService;
