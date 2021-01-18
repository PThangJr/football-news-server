"use strict";

var apiRouter = require('./newsRouter');

var route = function route(app) {
  app.use('/api/news', apiRouter);
};

module.exports = route;