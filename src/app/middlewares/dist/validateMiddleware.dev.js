"use strict";

var AuthModel = require('../models/AuthModel');

var checkUniqueAuthMiddleware = function checkUniqueAuthMiddleware(req, res, next) {
  var _req$body, username, password, email, user, error, emailDB;

  return regeneratorRuntime.async(function checkUniqueAuthMiddleware$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, username = _req$body.username, password = _req$body.password, email = _req$body.email;
          _context.next = 4;
          return regeneratorRuntime.awrap(AuthModel.findOne({
            username: username
          }));

        case 4:
          user = _context.sent;
          error = {
            message: {},
            statusCode: 200
          };

          if (user) {
            error.message.username = 'Tài khoản đã tồn tại. Vui lòng nhập lại';
            error.statusCode = 400;
          }

          _context.next = 9;
          return regeneratorRuntime.awrap(AuthModel.findOne({
            email: email
          }));

        case 9:
          emailDB = _context.sent;

          if (emailDB) {
            error.message.email = 'Email đã tồn tại. Vui lòng nhập lại';
            error.statusCode = 400; // message.push({ email: 'Email đã tồn tại. Vui lòng nhập lại!' });
          }

          if (!error.message) {
            _context.next = 14;
            break;
          }

          console.log(error);
          throw error;

        case 14:
          next();
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

module.exports = checkUniqueAuthMiddleware;