"use strict";

var express = require('express');

var router = express.Router();

var adminController = require('../app/controllers/AdminController');

router.post('/', adminController.login);
module.exports = router;