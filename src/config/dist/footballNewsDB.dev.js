"use strict";

var mongoose = require('mongoose');

var _require = require('../config/config'),
    mongoDBConfig = _require.mongoDBConfig; // const { PORT, HOST, COLLECTION } = mongoDBConfig;


var connect = function connect() {
  return regeneratorRuntime.async(function connect$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(mongoose.connect(process.env.MONGGO_SERVER, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
          }));

        case 3:
          console.log('Connected MongoDB successfully!!!');
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.log('Error MongoDB: ' + _context.t0);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

module.exports = {
  connect: connect
};