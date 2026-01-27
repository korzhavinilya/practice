const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token.model');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });
    return { accessToken, refreshToken };
  }

  async saveRefreshToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    return TokenModel.create({ user: userId, refreshToken });
  }

  async getRefreshToken(refreshToken) {
    return await TokenModel.findOne({ refreshToken });
  }

  async removeRefreshToken(refreshToken) {
    return await TokenModel.deleteOne({ refreshToken });
  }

  validateAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      return null;
    }
  }
}

module.exports = new TokenService();
