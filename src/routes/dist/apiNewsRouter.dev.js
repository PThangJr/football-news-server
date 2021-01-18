"use strict";

var express = require('express');

var apiController = require('../app/controllers/ApiNewsController');

var router = express.Router();
router.get('/news', apiController.index);
module.exports = router;