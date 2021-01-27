"use strict";

var express = require('express');

var authMiddleware = require('../app/middlewares/authMiddleware');

var authController = require('../app/controllers/AuthController');

var validateMiddleware = require('../app/middlewares/validateMiddleware');

var router = express.Router();
router.post('/register', validateMiddleware, authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/refresh_token', authController.refreshToken);
router.get('/account', authMiddleware, authController.getUser);
module.exports = router;