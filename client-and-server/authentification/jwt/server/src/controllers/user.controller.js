const userService = require('../services/user.service');

class UserController {
  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();

      //TODO return dto

      return res.json({ users });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
