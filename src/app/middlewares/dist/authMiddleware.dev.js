"use strict";

var jwt = require('jsonwebtoken');

var authMiddleware = function authMiddleware(req, res, next) {
  try {
    var token = req.header('Authorization');
    if (!token) return res.status(500).json({
      message: 'Invalid Authorization'
    });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
      if (err) return res.status(500).json({
        message: 'Invalid Authorization'
      });
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = authMiddleware;