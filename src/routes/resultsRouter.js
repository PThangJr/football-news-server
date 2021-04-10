const express = require('express');
const resultsController = require('../app/controllers/ResultsController');
const adminMiddleware = require('../app/middlewares/adminMiddleware');
const authMiddleware = require('../app/middlewares/authMiddleware');
const router = express.Router();

router.get('/', resultsController.getAllResults);
router.get('/:slug', resultsController.getResultBySlug);
router.post('/', authMiddleware, adminMiddleware, resultsController.postResult);

module.exports = router;
