"use strict";

var express = require('express');

var apiController = require('../app/controllers/NewsController');

var authMiddleware = require('../app/middlewares/authMiddleware');

var adminMiddleware = require('../app/middlewares/adminMiddleware');

var router = express.Router();
router.get('/premier-league', apiController.getPremierLeague);
router.get('/la-liga', apiController.getLaLiga);
router.get('/serie-a', apiController.getSerieA);
router.get('/bundesliga', apiController.getBundesliga);
router.get('/ligue-1', apiController.getLigue1);
router.get('/:newId', apiController.getNewsById);
router.get('/', apiController.index);
router["delete"]('/:newId', authMiddleware, adminMiddleware, apiController.removeNew);
router.post('/', authMiddleware, adminMiddleware, apiController.createNew);
router.put('/:newId', authMiddleware, adminMiddleware, apiController.updateNew);
module.exports = router;