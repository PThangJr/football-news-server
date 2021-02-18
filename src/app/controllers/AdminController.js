const AuthModel = require('../models/AuthModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
class AdminController {
  // [POST] Login Admin
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await AuthModel.findOne({ username, role: 0 }).exec();
      if (!user) {
        const error = {
          message: {
            username: 'Tài khoản không đúng. Vui lòng nhập lại',
          },
        };
        error.statusCode = 400;
        throw error;
      }
      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword) {
        const error = {
          message: {
            password: 'Mật khẩu không đúng. Vui lòng nhập lại',
          },
        };
        error.statusCode = 400;
        throw error;
      }
      //Send token
      const access_token = createAccessToken({ id: user._id });
      res.json({ username: user.username, access_token });
    } catch (error) {
      next(error);
    }
  }
}

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};
module.exports = new AdminController();
