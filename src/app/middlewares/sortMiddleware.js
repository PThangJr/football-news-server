module.exports = (req, res, next) => {
  try {
    res.locals._sort = {
      enable: false,
      type: 'default',
    };
    if (req.query.hasOwnProperty('_sort')) {
      const isValidType = ['asc', 'desc'].includes(req.query.type);
      Object.assign(res.locals._sort, {
        enable: true,
        type: (isValidType && req.query.type) || 'default',
        column: req.query.column,
      });
      //   return res.json({ result: res.locals });
      next();
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
