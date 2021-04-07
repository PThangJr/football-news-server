const AuthModel = require('../models/AuthModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('../../cloudinary');
class AuthController {
  // [POST] create account
  async register(req, res, next) {
    try {
      const { username, password, email } = req.body;
      const passwordHash = password !== '' ? await bcrypt.hash(password, 10) : '';

      // console.log(result);
      // Save User in MongoDB
      const newUser = new AuthModel({
        username,
        email,

        password: passwordHash,
      });
      await newUser.save();
      //Create access token
      const access_token = createAccessToken({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      });
      //Refresh Token
      const refresh_token = createRefreshToken({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      });

      return res.status(201).json({
        user: {
          username: newUser.username,
          email: newUser.email,
          avatar: newUser.avatar,
          age: newUser.age,
          gender: newUser.gender,
        },
        access_token,
        status: 'success',
      });
    } catch (error) {
      console.log(error);
      // res.json(error);
      next(error);
    }
  }
  // [TOKEN] Refresh Token
  refreshToken(req, res) {
    try {
      const refresh_token = req.cookies.refresh_token;
      if (!refresh_token) {
        return res.status(400).json({ message: 'Please Login or Register' });
      } else {
        jwt.verify(refresh_token, process.env.ACCESS_TOKEN_REFRESH, (err, user) => {
          if (err) return res.status(400).json({ message: 'Please Login or Register' });
          const accessToken = createAccessToken({ _id: user._id });

          res.json({ user, access_token: accessToken });
        });
      }
      res.json({ refresh_token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  //[POST] Login
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await AuthModel.findOne({ username });
      if (!user) {
        const errors = {
          username: 'Tài khoản không tồn tại. Vui lòng nhập lại!',
          statusCode: 400,
        };
        throw errors;
      }
      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword) {
        const errors = {
          password: 'Mật khẩu không đúng. Vui lòng nhập lại!',
          statusCode: 400,
        };
        throw errors;
      }
      // Access Token
      const access_token = createAccessToken({ _id: user._id, username: user.username, email: user.email });
      //Refresh Token
      const refresh_token = createRefreshToken({ _id: user._id, username: user.username, email: user.email });

      res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        path: '/api/user/refresh_token',
      });
      return res.status(200).json({
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          gender: user.gender,
          age: user.age,
        },
        access_token,
      });
      // res.json({ message: 'Login successfully' });
    } catch (error) {
      next(error);
    }
  }
  //[GET] logout
  async logout(req, res) {
    try {
      await res.clearCookie('refresh_token', { path: '/api/user/refresh_token' });
      res.json({ message: 'Clear cookies' });
    } catch (error) {
      next(error);
    }
  }
  //[GET] Get Information User
  async getInfoUser(req, res, next) {
    try {
      const infoUser = await AuthModel.findOne({ _id: req.user.id }).select('-password');
      if (!infoUser) {
        throw createError(404, 'Tài khoản không tồn tại!');
      }
      res.status(200).json({ infoUser });
    } catch (error) {
      next(error);
    }
  }
  // [PUT] Update user
  async updateUser(req, res, next) {
    try {
      const { file } = req;
      const update = { ...req.body };
      var options;
      if (req.user.avatar.public_id === 'football-news/avatars/default_avatar') {
        options = { folder: 'football-news/avatars' };
      } else {
        options = {
          public_id: req.user.avatar.public_id,
          overwrite: true,
          unique_filename: true,
        };
      }
      if (req.file) {
        var result = await cloudinary.v2.uploader.upload(req.file.path, options);
      }
      if (result) {
        update.avatar = {
          public_id: result.public_id,
          secure_url: result.secure_url,
        };
      }
      const userUpdated = await AuthModel.findByIdAndUpdate(req.user._id, update);
      res.status(200).json({ userUpdated });
    } catch (error) {
      next(error);
    }
  }
  // [POST] admin
  async admin(req, res) {
    try {
      const { username, password } = req.body;
      const user = await AuthModel.findOne({ username, role: 0 });
      if (!user) return res.status(400).json({ message: 'Tài khoản không tồn tại. Vui lòng nhập lại' });
      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword) return res.status(400).json({ message: 'Mật khẩu không đúng. Vui lòng nhập lại' });

      //Send Token
      const access_token = createAccessToken({ id: user._id });
      res.status(200).json({ access_token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  //[PUT] change password
  async changePassword(req, res, next) {
    try {
      const { oldPassword, newPassword } = req.body;
      if (oldPassword) {
        const user = await AuthModel.findOne({ _id: req.user.id });
        const isPassword = await bcrypt.compare(oldPassword, user.password);
        if (isPassword) {
          const hashOldPassword = await bcrypt.hash(newPassword, 10);
          await AuthModel.findByIdAndUpdate(req.user.id, {
            password: hashOldPassword,
          });
          res.json({ status: 'Success', message: 'Thay đổi mật khẩu thành công!' });
        } else {
          const error = {
            oldPassword: 'Mật khẩu cũ không chính xác. Vui lòng nhập lại',
            statusCode: 400,
          };
          throw error;
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_REFRESH, { expiresIn: '7d' });
};
module.exports = new AuthController();
