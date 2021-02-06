"use strict";

var apiRouter = require('./newsRouter');

var authRouter = require('./authRouter');

var adminRouter = require('./adminRoute');

var route = function route(app) {
  app.use('/api/v1/news', apiRouter);
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/admin', adminRouter);
};

module.exports = route;