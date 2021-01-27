const apiRouter = require('./newsRouter');
const authRouter = require('./authRouter');

const route = (app) => {
  app.use('/api/news', apiRouter);
  app.use('/api/user', authRouter);
};
module.exports = route;
