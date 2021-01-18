"use strict";

require('dotenv').config();

var express = require('express');

var cors = require('cors');

var route = require('./routes');

var footballNewsDB = require('./config/footballNewsDB');

var pagination = require('./app/middleware/pagination'); // console.log(process.env.PORT);


var app = express();
footballNewsDB.connect();
var PORT = process.env.PORT || 8080;
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json()); //Middleware fix CORS

app.use(cors()); //Middleware
//Routes

route(app);
app.listen(PORT, function () {
  console.log("App start at PORT: ".concat(PORT));
});