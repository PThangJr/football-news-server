const express = require('express');
const newsController = require('../app/controllers/NewsController');
const authMiddleware = require('../app/middlewares/authMiddleware');
const adminMiddleware = require('../app/middlewares/adminMiddleware');
const NewsController = require('../app/controllers/NewsController');
const router = express.Router();
const upload = require('../multer');
const searchMiddleware = require('../app/middlewares/searchMiddleware');
router.get('/', NewsController.index);
router.get('/comments/:slug', NewsController.getComments);
router.get('/:tournament', NewsController.getNewsByTournament);
router.put('/:newId', authMiddleware, adminMiddleware, upload.single('thumbnail'), NewsController.updateNewById);
router.delete('/:newId', authMiddleware, adminMiddleware, NewsController.deleteNewById);
router.put('/:newId', upload.single('thumbnail'), NewsController.testUpdate);

router.post('/', authMiddleware, adminMiddleware, upload.single('thumbnail'), newsController.createNew);

module.exports = router;
