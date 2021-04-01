const express = require('express');
const newsController = require('../app/controllers/NewsController');
const authMiddleware = require('../app/middlewares/authMiddleware');
const adminMiddleware = require('../app/middlewares/adminMiddleware');
const NewsController = require('../app/controllers/NewsController');
const router = express.Router();
const upload = require('../multer');
const searchMiddleware = require('../app/middlewares/searchMiddleware');
router.get('/comments/:slug', NewsController.getComments);
router.get('/:tournament', NewsController.getNewsByTournament);
router.get('/', NewsController.index);
router.put('/:newId', NewsController.updateNewByTournament);
router.delete('/:newId', authMiddleware, adminMiddleware, NewsController.updateNewByTournament);

router.post('/', authMiddleware, adminMiddleware, upload.single('thumbnail'), newsController.createNew);

module.exports = router;
