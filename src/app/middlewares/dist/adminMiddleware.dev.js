"use strict";

var AuthModel = require('../models/AuthModel');

var adminMiddleware = function adminMiddleware(req, res, next) {
  var user;
  return regeneratorRuntime.async(function adminMiddleware$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(AuthModel.findOne({
            _id: req.user.id
          }));

        case 2:
          user = _context.sent;

          if (!(user.role === 1)) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.json({
            message: 'Admin resource access denied'
          }));

        case 5:
          if (user.role === 0) next();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = adminMiddleware;