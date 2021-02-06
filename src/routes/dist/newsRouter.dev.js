"use strict";

var express = require('express');

var newsController = require('../app/controllers/NewsController');

var authMiddleware = require('../app/middlewares/authMiddleware');

var adminMiddleware = require('../app/middlewares/adminMiddleware');

var router = express.Router();
router.get('/premier-league', newsController.getPremierLeague);
router.get('/la-liga', newsController.getLaLiga);
router.get('/serie-a', newsController.getSerieA);
router.get('/bundesliga', newsController.getBundesliga);
router.get('/ligue-1', newsController.getLigue1);
router.get('/:slug', newsController.getNewBySlug);
router.get('/:newId', newsController.getNewsById);
router.get('/', newsController.index);
router["delete"]('/:slug', authMiddleware, adminMiddleware, newsController.removeNewBySlug);
router["delete"]('/:newId', authMiddleware, adminMiddleware, newsController.removeNew);
router.post('/', authMiddleware, adminMiddleware, newsController.createNew);
router.put('/:slug', authMiddleware, adminMiddleware, newsController.updateNewBySlug);
router.put('/:newId', authMiddleware, adminMiddleware, newsController.updateNew);
module.exports = router;