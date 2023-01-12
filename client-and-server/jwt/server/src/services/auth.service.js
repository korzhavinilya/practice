const bcrypt = require('bcrypt');
const { v4: uuidV4 } = require('uuid');
const UserDto = require('../dto/user.dto');
const tokenService = require('./token.service');
const mailService = require('./mail.service');
const userService = require('./user.service');
const ApiError = require('../exceptions/api.error');

class AuthService {
  async registration(email, password) {
    const candidate = await userService.getUserByEmail(email);

    if (candidate) {
      throw ApiError.BadRequest('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidV4();
    const user = await userService.createUser({
      email,
      password: hashedPassword,
      activationLink,
    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/auth/activate/${activationLink}`
    );

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await userService.getUserByActivationLink(activationLink);

    if (!user) {
      throw ApiError.BadRequest('Incorrect activation link');
    }

    if (user.isActivated) {
      throw ApiError.BadRequest('User has already been activated');
    }

    user.isActivated = true;
    console.log(user);
    await user.save();
  }

  async login(email, password) {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      throw ApiError.BadRequest("User doesn't exist");
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      throw ApiError.BadRequest('Incorrect password');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    return tokenService.removeRefreshToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.getRefreshToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await userService.getUserById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
}

module.exports = new AuthService();
