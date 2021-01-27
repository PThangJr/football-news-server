"use strict";

var express = require('express');

var UserController = require('../app/controllers/UserController');

var router = express.Router();
router.post('/', UserController.index);
module.exports = router;