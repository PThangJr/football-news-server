const apiRouter = require('./newsRouter');
const authRouter = require('./authRouter');
const adminRouter = require('./adminRouter');
const newDetailRouter = require('./newDetailRouter');
const tournamentsRouter = require('./tournamentsRouter');
const commentsRouter = require('./commentsRouter');
const clubsRouter = require('./clubsRouter');
const route = (app) => {
  app.use('/api/v1/news', apiRouter);
  app.use('/api/v1/new-detail', newDetailRouter);
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/admin', adminRouter);
  app.use('/api/v1/tournaments', tournamentsRouter);
  app.use('/api/v1/comments', commentsRouter);
  app.use('/api/v1/clubs', clubsRouter);
};
module.exports = route;
