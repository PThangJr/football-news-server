"use strict";

var tournamentMiddleware = function tournamentMiddleware(req, res, next) {
  console.log('Tournament');
  res.json({
    tour: 'tournament'
  }); //   next();
};

var nextController = function nextController(req, res, next) {
  next();
};

var express = require('express');

var router = express.Router();
router.get('/premier-league2', tournamentMiddleware);
router.get('/', nextController);
module.exports = router;