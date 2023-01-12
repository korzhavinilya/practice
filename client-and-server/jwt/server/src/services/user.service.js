const UserModel = require('../models/user.model');

class UserService {
  async getUserByEmail(email) {
    return UserModel.findOne({ email });
  }

  async getUserById(id) {
    return UserModel.findById(id);
  }

  async getUserByActivationLink(activationLink) {
    return UserModel.findOne({ activationLink });
  }

  async getAllUsers() {
    return UserModel.find();
  }

  async createUser(user) {
    return UserModel.create(user);
  }
}

module.exports = new UserService();
