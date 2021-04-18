const express = require('express');
const tournamentsController = require('../app/controllers/TournamentsController');
const authMiddleware = require('../app/middlewares/authMiddleware');
const adminMiddleware = require('../app/middlewares/adminMiddleware');
const upload = require('../multer');
const router = express.Router();

router.get('/', tournamentsController.getAllTournaments);
router.get('/:slug', tournamentsController.getTournamentBySlug);
router.post('/', authMiddleware, adminMiddleware, upload.single('logo'), tournamentsController.createTournament);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('logo'), tournamentsController.updateTournamentById);
router.delete('/:id', authMiddleware, adminMiddleware, tournamentsController.deleteTournamentById);
module.exports = router;
