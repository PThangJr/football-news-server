module.exports = (req, res, next) => {
  res.locals.isPagination = true;
  next();
};
