"use strict";

var express = require('express');

var apiController = require('../app/controllers/NewsController');

var router = express.Router();
router.get('/premier-league', apiController.getPremierLeague);
router.get('/:newId', apiController.getNewsById);
router.get('/', apiController.index);
router["delete"]('/:newId', apiController.removeNew);
router.post('', apiController.createNew);
router.put('/:newId', apiController.updateNew);
module.exports = router;