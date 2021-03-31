const express = require('express');
const commentsController = require('../app/controllers/CommentsController');
const authMiddleware = require('../app/middlewares/authMiddleware');
const router = express.Router();
router.post('/:newId', authMiddleware, commentsController.comment);
module.exports = router;
