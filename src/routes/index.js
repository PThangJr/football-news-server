const apiRouter = require('./newsRouter');
const authRouter = require('./authRouter');
const adminRouter = require('./adminRoute');
const route = (app) => {
  app.use('/api/v1/news', apiRouter);
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/admin', adminRouter);
};
module.exports = route;
