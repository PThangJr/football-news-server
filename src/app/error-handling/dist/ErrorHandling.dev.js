"use strict";

var errorHandling = function errorHandling(err, req, res, next) {
  res.status(err.statusCode || 500);
  var errors = err.errors;

  if (errors) {
    var result = {};

    for (var _err in errors) {
      result[_err] = errors[_err].message;
    }

    err.message = result;
  }

  res.json({
    error: {
      status: 'Fail',
      message: err.message || err
    }
  });
};

module.exports = errorHandling;