const express = require('express');
const commentsController = require('../app/controllers/CommentsController');
const authMiddleware = require('../app/middlewares/authMiddleware');
const router = express.Router();
router.post('/:slugNew', authMiddleware, commentsController.postCommentBySlugNew);
router.get('/:slugNew', commentsController.getCommentBySlugNew);
router.delete('/:commentId', authMiddleware, commentsController.deleteCommentById);
router.post('/:newId', authMiddleware, commentsController.postComment);
module.exports = router;
