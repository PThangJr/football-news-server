const slugify = require('slugify');

module.exports = (req, res, next) => {
  try {
    res.locals = {
      enable: false,
    };
    if (req.query.hasOwnProperty('_search')) {
      Object.assign(res.locals, {
        enable: true,
        title: slugify(req.query.title, { replacement: '+', lower: true }),
      });
    }
    return res.json({ result: res.locals });
  } catch (error) {
    next(error);
  }
};
