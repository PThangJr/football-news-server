const AuthModel = require('../models/AuthModel');
const adminMiddleware = async (req, res, next) => {
  const user = await AuthModel.findOne({ _id: req.user.id });
  if (user.role === 1) return res.json({ message: 'Admin resource access denied' });
  if (user.role === 0) next();
};

module.exports = adminMiddleware;
