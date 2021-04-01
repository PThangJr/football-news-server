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
      // Save User in MongoDB
      const newUser = new AuthModel({
        username,
        email,
        password: passwordHash,
      });
      await newUser.save();

      //Create access token
      const access_token = createAccessToken({
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
      });
      //Refresh Token
      const refresh_token = createRefreshToken({
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
      });

      return res.json({
        user: {
          username: newUser.username,
          email: newUser.email,
          role: 1,
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
          const accessToken = createAccessToken({ id: user.id });

          res.json({ user, access_token: accessToken });
        });
      }
      res.json({ refresh_token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  //[POST] Login
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await AuthModel.findOne({ username });
      if (!user) return res.status(400).json({ username: 'Tài khoản không tồn tại. Vui lòng nhập lại!' });
      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword) return res.status(400).json({ password: 'Mật khẩu không đúng. Vui lòng nhập lại!' });
      // Access Token
      const access_token = createAccessToken({ id: user._id, username: user.username, email: user.email });
      //Refresh Token
      const refresh_token = createRefreshToken({ id: user._id, username: user.username, email: user.email });

      res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        path: '/api/user/refresh_token',
      });

      return res.json({
        user: {
          username: user.username,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
        access_token,
      });
      // res.json({ message: 'Login successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  //[GET] logout
  async logout(req, res) {
    try {
      await res.clearCookie('refresh_token', { path: '/api/user/refresh_token' });
      res.json({ message: 'Clear cookies' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  //[GET] account
  async getUser(req, res) {
    try {
      const infoUser = await AuthModel.findOne({ _id: req.user.id }).select('-password');

      res.status(200).json({ infoUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  // [PUT] Update user
  async updateUser(req, res, next) {
    try {
      const { id } = req.user;
      const { update = {}, file } = req;

      if (file) {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: 'football-news/avatars',
        });
        update.avatar = {
          public_id: result.public_id,
          secure_url: result.secure_url,
        };
      }
      const userUpdated = await AuthModel.updateOne({ _id: id }, update, { runValidators: true });
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
}

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_REFRESH, { expiresIn: '7d' });
};
module.exports = new AuthController();
