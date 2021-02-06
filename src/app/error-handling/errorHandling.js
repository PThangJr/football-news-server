const errorHandling = (err, req, res, next) => {
  res.status(err.statusCode || 500);

  const { errors } = err;
  if (errors) {
    const result = {};
    for (let err in errors) {
      result[err] = errors[err].message;
    }
    err.message = result;
  }

  res.json({
    error: {
      status: 'Fail',
      message: err.message || err,
    },
  });
};
module.exports = errorHandling;
