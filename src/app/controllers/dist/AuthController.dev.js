"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AuthModel = require('../models/AuthModel');

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var AuthController =
/*#__PURE__*/
function () {
  function AuthController() {
    _classCallCheck(this, AuthController);
  }

  _createClass(AuthController, [{
    key: "register",
    // [POST] create account
    value: function register(req, res) {
      var _req$body, username, password, email, passwordHash, newUser, access_token, refresh_token;

      return regeneratorRuntime.async(function register$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, username = _req$body.username, password = _req$body.password, email = _req$body.email;
              _context.next = 4;
              return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

            case 4:
              passwordHash = _context.sent;
              // Save User in MongoDB
              newUser = new AuthModel({
                username: username,
                email: email,
                password: passwordHash
              });
              _context.next = 8;
              return regeneratorRuntime.awrap(newUser.save());

            case 8:
              //Create access token
              access_token = createAccessToken({
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
              }); //Refresh Token

              refresh_token = createRefreshToken({
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
              });
              res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                path: '/api/user/refresh_token'
              });
              return _context.abrupt("return", res.json({
                user: {
                  username: newUser.username,
                  email: newUser.email,
                  role: 1
                },
                access_token: access_token
              }));

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](0);
              res.status(500).json({
                message: _context.t0.message
              });

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 14]]);
    } // [TOKEN] Refresh Token

  }, {
    key: "refreshToken",
    value: function refreshToken(req, res) {
      try {
        var refresh_token = req.cookies.refresh_token;

        if (!refresh_token) {
          return res.status(400).json({
            message: 'Please Login or Register'
          });
        } else {
          jwt.verify(refresh_token, process.env.ACCESS_TOKEN_REFRESH, function (err, user) {
            if (err) return res.status(400).json({
              message: 'Please Login or Register'
            });
            var accessToken = createAccessToken({
              id: user.id
            });
            res.json({
              user: user,
              access_token: accessToken
            });
          });
        }

        res.json({
          refresh_token: refresh_token
        });
      } catch (error) {
        res.status(500).json({
          message: error.message
        });
      }
    } //[POST] Login

  }, {
    key: "login",
    value: function login(req, res) {
      var _req$body2, username, password, user, isPassword, access_token, refresh_token;

      return regeneratorRuntime.async(function login$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
              _context2.next = 4;
              return regeneratorRuntime.awrap(AuthModel.findOne({
                username: username
              }));

            case 4:
              user = _context2.sent;

              if (user) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                username: 'Tài khoản không tồn tại. Vui lòng nhập lại!'
              }));

            case 7:
              _context2.next = 9;
              return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

            case 9:
              isPassword = _context2.sent;

              if (isPassword) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                password: 'Mật khẩu không đúng. Vui lòng nhập lại!'
              }));

            case 12:
              // Access Token
              access_token = createAccessToken({
                id: user._id,
                username: user.username,
                email: user.email
              }); //Refresh Token

              refresh_token = createRefreshToken({
                id: user._id,
                username: user.username,
                email: user.email
              });
              res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                path: '/api/user/refresh_token'
              });
              return _context2.abrupt("return", res.json({
                user: {
                  username: user.username,
                  email: user.email,
                  role: user.role
                },
                access_token: access_token
              }));

            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2["catch"](0);
              res.status(500).json({
                message: _context2.t0.message
              });

            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 18]]);
    } //[GET] logout

  }, {
    key: "logout",
    value: function logout(req, res) {
      return regeneratorRuntime.async(function logout$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return regeneratorRuntime.awrap(res.clearCookie('refresh_token', {
                path: '/api/user/refresh_token'
              }));

            case 3:
              res.json({
                message: 'Clear cookies'
              });
              _context3.next = 9;
              break;

            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3["catch"](0);
              res.status(500).json({
                message: _context3.t0.message
              });

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 6]]);
    } //[GET] account

  }, {
    key: "getUser",
    value: function getUser(req, res) {
      var user;
      return regeneratorRuntime.async(function getUser$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return regeneratorRuntime.awrap(AuthModel.findOne({
                _id: req.user.id
              }).select('-password'));

            case 3:
              user = _context4.sent;
              res.json({
                user: user
              });
              _context4.next = 10;
              break;

            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              res.status(500).json({
                message: _context4.t0.message
              });

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[0, 7]]);
    }
  }]);

  return AuthController;
}(); //Error
// res.status(500).json({ message: error.message });


var createAccessToken = function createAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d'
  });
};

var createRefreshToken = function createRefreshToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_REFRESH, {
    expiresIn: '7d'
  });
};

module.exports = new AuthController();