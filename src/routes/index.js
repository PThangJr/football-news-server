const apiRouter = require('./newsRouter');

const route = (app) => {
  app.use('/api/news', apiRouter);
};
module.exports = route;
