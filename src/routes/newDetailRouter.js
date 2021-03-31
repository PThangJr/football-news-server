const express = require('express');
const newDetailController = require('../app/controllers/NewDetailController');
const authMiddleware = require('../app/middlewares/authMiddleware');
const router = express.Router();

router.post('/likes/:slug', authMiddleware, newDetailController.likedNew);
router.get('/:slug', newDetailController.getNewBySlug);

module.exports = router;
