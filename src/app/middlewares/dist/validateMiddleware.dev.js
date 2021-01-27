"use strict";

var AuthModel = require('../models/AuthModel');

var validateMiddleware = function validateMiddleware(req, res, next) {
  var _req$body, username, password, rePassword, email, user, message, emailDB;

  return regeneratorRuntime.async(function validateMiddleware$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, username = _req$body.username, password = _req$body.password, rePassword = _req$body.rePassword, email = _req$body.email;
          _context.next = 4;
          return regeneratorRuntime.awrap(AuthModel.findOne({
            username: username
          }));

        case 4:
          user = _context.sent;
          message = [];

          if (user) {
            message.push({
              username: 'Tài khoản đã tồn tại. Vui lòng nhập lại!'
            });
          }

          _context.next = 9;
          return regeneratorRuntime.awrap(AuthModel.findOne({
            email: email
          }));

        case 9:
          emailDB = _context.sent;

          if (emailDB) {
            message.push({
              email: 'Email đã tồn tại. Vui lòng nhập lại!'
            });
          }

          if (password.length < 6) {
            message.push({
              password: 'Password must not be less than 6 characters '
            });
          }

          if (password !== rePassword) {
            message.push({
              rePassword: 'Mật khẩu nhập lại không khớp. Vui lòng nhập lại!'
            });
          }

          if (message.length > 0) {
            res.status(400).json({
              message: message
            });
          } else {
            next();
          }

          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: _context.t0.message
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

module.exports = validateMiddleware;