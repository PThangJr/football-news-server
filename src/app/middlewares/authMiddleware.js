const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
  try {
    const access_token = req.header('Authorization');
    if (access_token) {
      var token = access_token.replace('Bearer ', '');
    }
    if (!token) {
      const error = new Error('Invalid Authorization. Please Login or Register');
      error.statusCode = 401;
      throw error;
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        const error = new Error('Invalid Authorization. Please Login or Register');
        error.statusCode = 401;
        throw error;
      }
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};
module.exports = authMiddleware;
