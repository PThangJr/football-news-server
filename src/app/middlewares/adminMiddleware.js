const AuthModel = require('../models/AuthModel');
const adminMiddleware = async (req, res, next) => {
  try {
    const user = await AuthModel.findOne({ _id: req.user.id });
    if (parseInt(user.role) === 0) next();
    else {
      const error = new Error('Admin resource access denied');
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;
