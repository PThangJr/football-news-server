"use strict";

require('dotenv').config();

var express = require('express');

var cors = require('cors');

var route = require('./routes');

var footballNewsDB = require('./config/footballNewsDB');

var cookieParser = require('cookie-parser');

var errorHandling = require('./app/error-handling/errorHandling'); // console.log(process.env.PORT);


var bcrypt = require('bcrypt');

var app = express();
footballNewsDB.connect();
var PORT = process.env.PORT || 8080;
app.use(cookieParser());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json()); //Middleware fix CORS

app.use(cors()); // const passwordHash = bcrypt.hash('123456', 10).then((res) => {
//   console.log(res);
// });
//Routes

route(app);
app.use(function (req, res, next) {
  var error = new Error('Page not found');
  error.statusCode = 404;
  next(error);
});
app.use(errorHandling);
app.listen(PORT, function () {
  console.log("App start at PORT: ".concat(PORT));
});