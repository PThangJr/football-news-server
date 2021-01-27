"use strict";

module.exports = function (req, res, next) {
  res.locals.isPagination = true;
  next();
};