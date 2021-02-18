"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AuthModel = require('../models/AuthModel');

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var createError = require('http-errors');

var AdminController =
/*#__PURE__*/
function () {
  function AdminController() {
    _classCallCheck(this, AdminController);
  }

  _createClass(AdminController, [{
    key: "login",
    // [POST] Login Admin
    value: function login(req, res, next) {
      var _req$body, username, password, user, error, isPassword, _error, access_token;

      return regeneratorRuntime.async(function login$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, username = _req$body.username, password = _req$body.password;
              _context.next = 4;
              return regeneratorRuntime.awrap(AuthModel.findOne({
                username: username,
                role: 0
              }).exec());

            case 4:
              user = _context.sent;

              if (user) {
                _context.next = 9;
                break;
              }

              error = {
                message: {
                  username: 'Tài khoản không đúng. Vui lòng nhập lại'
                }
              };
              error.statusCode = 400;
              throw error;

            case 9:
              _context.next = 11;
              return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

            case 11:
              isPassword = _context.sent;

              if (isPassword) {
                _context.next = 16;
                break;
              }

              _error = {
                message: {
                  password: 'Mật khẩu không đúng. Vui lòng nhập lại'
                }
              };
              _error.statusCode = 400;
              throw _error;

            case 16:
              //Send token
              access_token = createAccessToken({
                id: user._id
              });
              res.json({
                username: user.username,
                access_token: access_token
              });
              _context.next = 23;
              break;

            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](0);
              next(_context.t0);

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 20]]);
    }
  }]);

  return AdminController;
}();

var createAccessToken = function createAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d'
  });
};

module.exports = new AdminController();