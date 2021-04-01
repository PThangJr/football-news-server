module.exports = (req, res, next) => {
  try {
    // console.log(req);
    if (req.body) {
      const update = Object.keys(req.body).reduce((acc, cur) => {
        if (req.body[cur]) {
          acc[cur] = req.body[cur];
        }
        return acc;
      }, {});
      req.update = update;
      next();
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
