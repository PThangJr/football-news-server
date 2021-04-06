const jwt = require('jsonwebtoken');
const AuthModel = require('../models/AuthModel');
const createError = require('http-errors');
const authMiddleware = async (req, res, next) => {
  try {
    const access_token = req.header('Authorization');
    if (access_token) {
      var token = access_token.replace('Bearer ', '');
    }
    if (!token) {
      throw createError(401, 'Invalid Authorization. Please Login or Register');
    }
    const userVerify = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!userVerify) {
      throw createError(401, 'Invalid Authorization. Please Login or Register');
    }
    const user = await AuthModel.findById(userVerify._id).select('-password');
    if (!user) {
      throw createError(401, 'Invalid Authorization. Please Login or Register');
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = authMiddleware;
