const express = require('express');
const clubsController = require('../app/controllers/ClubsController');
const adminMiddleware = require('../app/middlewares/adminMiddleware');
const authMiddleware = require('../app/middlewares/authMiddleware');
const router = express.Router();
const upload = require('../multer');

router.get('/', clubsController.getAll);
router.post('/', authMiddleware, adminMiddleware, upload.single('logo'), clubsController.create);
router.put('/:clubId', authMiddleware, adminMiddleware, upload.single('logo'), clubsController.updateClub);

module.exports = router;
