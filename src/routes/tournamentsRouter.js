const express = require('express');
const tournamentsController = require('../app/controllers/TournamentsController');
const upload = require('../multer');
const router = express.Router();

router.get('/', tournamentsController.getAllTournaments);
router.get('/:slug', tournamentsController.getTournamentBySlug);
router.post('/', tournamentsController.createTournament);
router.put('/:id', upload.single('logo'), tournamentsController.updateTournamentById);
router.delete('/:id', tournamentsController.deleteTournamentById);
module.exports = router;
