"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AuthModel = require('../models/AuthModel');

var checkUniqueAuthMiddleware = function checkUniqueAuthMiddleware(req, res, next) {
  var _req$body, username, email, user, error, emailDB;

  return regeneratorRuntime.async(function checkUniqueAuthMiddleware$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, username = _req$body.username, email = _req$body.email;
          _context.next = 4;
          return regeneratorRuntime.awrap(AuthModel.findOne({
            username: username
          }));

        case 4:
          user = _context.sent;
          error = {};

          if (user) {
            error.message = {
              username: 'Tài khoản đã tồn tại. Vui lòng nhập lại'
            };
            error.statusCode = 400;
          }

          _context.next = 9;
          return regeneratorRuntime.awrap(AuthModel.findOne({
            email: email
          }));

        case 9:
          emailDB = _context.sent;

          if (emailDB) {
            error.message = _objectSpread({}, error.message, {
              email: 'Email đã tồn tại. Vui lòng nhập lại'
            });
            error.statusCode = 400; // message.push({ email: 'Email đã tồn tại. Vui lòng nhập lại!' });
          }

          if (!error.message) {
            _context.next = 15;
            break;
          }

          throw error;

        case 15:
          next();

        case 16:
          _context.next = 21;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 18]]);
};

module.exports = checkUniqueAuthMiddleware;