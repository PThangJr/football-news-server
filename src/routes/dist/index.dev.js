"use strict";

var apiRouter = require('./newsRouter');

var authRouter = require('./authRouter');

var route = function route(app) {
  app.use('/api/news', apiRouter);
  app.use('/api/user', authRouter);
};

module.exports = route;