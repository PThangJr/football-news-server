const AuthModel = require('../models/AuthModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class AdminController {
  // [POST] Login Admin
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await AuthModel.findOne({ username });
      if (!user) return res.status(400).json({ username: 'Tài khoản không đúng. Vui lòng nhập lại' });
      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword) {
        console.log(isPassword);
        return res.status(400).json({ password: 'Mật khẩu không đúng. Vui lòng nhập lại' });
      }
      console.log('yes');
      //Send token
      const access_token = createAccessToken({ id: user._id });
      res.json({ username: user.username, access_token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};
module.exports = new AdminController();
