const AuthModel = require('../models/AuthModel');
const validateMiddleware = async (req, res, next) => {
  try {
    const { username, password, rePassword, email } = req.body;
    const user = await AuthModel.findOne({ username });
    const message = [];
    if (user) {
      message.push({ username: 'Tài khoản đã tồn tại. Vui lòng nhập lại!' });
    }
    const emailDB = await AuthModel.findOne({ email });
    if (emailDB) {
      message.push({ email: 'Email đã tồn tại. Vui lòng nhập lại!' });
    }
    if (password.length < 6) {
      message.push({ password: 'Password must not be less than 6 characters ' });
    }
    if (password !== rePassword) {
      message.push({ rePassword: 'Mật khẩu nhập lại không khớp. Vui lòng nhập lại!' });
    }

    if (message.length > 0) {
      res.status(400).json({ message });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = validateMiddleware;
