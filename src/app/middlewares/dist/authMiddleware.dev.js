"use strict";

var jwt = require('jsonwebtoken');

var authMiddleware = function authMiddleware(req, res, next) {
  try {
    var access_token = req.header('Authorization');

    if (access_token) {
      var token = access_token.replace('Bearer ', '');
    }

    if (!token) {
      var error = new Error('Invalid Authorization. Please Login or Register');
      error.statusCode = 401;
      throw error;
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
      if (err) {
        var _error = new Error('Invalid Authorization. Please Login or Register');

        _error.statusCode = 401;
        throw _error;
      }

      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;