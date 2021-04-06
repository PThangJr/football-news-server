const AuthModel = require('../models/AuthModel');
const adminMiddleware = async (req, res, next) => {
  try {
    if (req.user.role === 'admin') next();
    else {
      const error = new Error('Admin resource access denied');
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;
