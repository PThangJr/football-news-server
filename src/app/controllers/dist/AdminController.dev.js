"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AuthModel = require('../models/AuthModel');

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var AdminController =
/*#__PURE__*/
function () {
  function AdminController() {
    _classCallCheck(this, AdminController);
  }

  _createClass(AdminController, [{
    key: "login",
    // [POST] Login Admin
    value: function login(req, res) {
      var _req$body, username, password, user, isPassword, access_token;

      return regeneratorRuntime.async(function login$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, username = _req$body.username, password = _req$body.password;
              _context.next = 4;
              return regeneratorRuntime.awrap(AuthModel.findOne({
                username: username
              }));

            case 4:
              user = _context.sent;

              if (user) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                username: 'Tài khoản không đúng. Vui lòng nhập lại'
              }));

            case 7:
              _context.next = 9;
              return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

            case 9:
              isPassword = _context.sent;

              if (isPassword) {
                _context.next = 13;
                break;
              }

              console.log(isPassword);
              return _context.abrupt("return", res.status(400).json({
                password: 'Mật khẩu không đúng. Vui lòng nhập lại'
              }));

            case 13:
              console.log('yes'); //Send token

              access_token = createAccessToken({
                id: user._id
              });
              res.json({
                username: user.username,
                access_token: access_token
              });
              _context.next = 21;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](0);
              res.status(500).json({
                message: _context.t0.message
              });

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 18]]);
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