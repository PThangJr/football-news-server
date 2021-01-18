"use strict";

var express = require('express');

var apiController = require('../app/controllers/apiNewController');

var router = express.Router();
router.get('/', apiController.index);
module.exports = router;