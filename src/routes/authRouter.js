const express = require('express');
const authMiddleware = require('../app/middlewares/authMiddleware');
const authController = require('../app/controllers/AuthController');
const validateMiddleware = require('../app/middlewares/validateMiddleware');
const router = express.Router();

router.post('/register', validateMiddleware, authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/refresh_token', authController.refreshToken);
router.get('/account', authMiddleware, authController.getUser);

module.exports = router;
