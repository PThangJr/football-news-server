const AuthModel = require('../models/AuthModel');
const checkUniqueAuthMiddleware = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const user = await AuthModel.findOne({ username });
    const error = {};
    if (user) {
      error.message = {
        username: 'Tài khoản đã tồn tại. Vui lòng nhập lại',
      };
      error.statusCode = 400;
    }
    const emailDB = await AuthModel.findOne({ email });
    if (emailDB) {
      error.message = {
        ...error.message,
        email: 'Email đã tồn tại. Vui lòng nhập lại',
      };
      error.statusCode = 400;
      // message.push({ email: 'Email đã tồn tại. Vui lòng nhập lại!' });
    }
    if (error.message) {
      // console.log(error);
      throw error;
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
module.exports = checkUniqueAuthMiddleware;
