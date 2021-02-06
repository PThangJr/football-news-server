"use strict";

var AuthModel = require('../models/AuthModel');

var adminMiddleware = function adminMiddleware(req, res, next) {
  var user, error;
  return regeneratorRuntime.async(function adminMiddleware$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(AuthModel.findOne({
            _id: req.user.id
          }));

        case 3:
          user = _context.sent;

          if (!(parseInt(user.role) === 0)) {
            _context.next = 8;
            break;
          }

          next();
          _context.next = 10;
          break;

        case 8:
          error = new Error('Admin resource access denied');
          throw error;

        case 10:
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

module.exports = adminMiddleware;