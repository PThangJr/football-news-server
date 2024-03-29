const express = require('express');
const videosController = require('../app/controllers/VideosController');
const authMiddleware = require('../app/middlewares/authMiddleware');
const adminMiddleware = require('../app/middlewares/adminMiddleware');
const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, videosController.postVideo);
router.get('/', videosController.getAll);
router.get('/video-detail/:videoSlug', videosController.getVideoBySlug);
router.get('/:tournamentSlug', videosController.getTournamentVideo);

module.exports = router;
