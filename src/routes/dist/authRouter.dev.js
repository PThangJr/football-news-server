"use strict";

var express = require('express');

var authMiddleware = require('../app/middlewares/authMiddleware');

var authController = require('../app/controllers/AuthController');

var checkUniqueAuthMiddleware = require('../app/middlewares/checkUniqueAuthMiddleware');

var adminController = require('../app/controllers/AdminController');

var router = express.Router();
router.post('/register', checkUniqueAuthMiddleware, authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/refresh_token', authController.refreshToken);
router.get('/information', authMiddleware, authController.getUser); // router.get('/admin', adminController.login);

module.exports = router;