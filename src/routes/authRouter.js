const express = require('express');
const authMiddleware = require('../app/middlewares/authMiddleware');
const authController = require('../app/controllers/AuthController');
const checkUniqueAuthMiddleware = require('../app/middlewares/checkUniqueAuthMiddleware');
const adminController = require('../app/controllers/AdminController');
const checkBodyEmptyMiddleware = require('../app/middlewares/checkBodyEmptyMiddleware');
const upload = require('../multer');
const router = express.Router();

router.post('/register', checkUniqueAuthMiddleware, upload.single('avatar'), authController.register);
router.post('/login', authController.login);
router.post('/admin/login', authController.admin);
router.get('/logout', authController.logout);
router.get('/refresh_token', authController.refreshToken);
router.get('/information', authMiddleware, authController.getInfoUser);
router.put(
  '/information',
  authMiddleware,
  checkBodyEmptyMiddleware,
  upload.single('avatar'),
  authController.updateUser
);
router.put('/password', authMiddleware, authController.changePassword);
// router.get('/admin', adminController.login);

module.exports = router;
