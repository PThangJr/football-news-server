const VideosModel = require('../models/VideosModel');
const slugify = require('slugify');

const createError = require('http-errors');
class VideosController {
  async getAll(req, res, next) {
    try {
      const videos = await VideosModel.find().populate({ path: 'result' }).populate({ path: 'tournament' });
      res.status(200).json({ videos });
    } catch (error) {
      next(error);
    }
  }
  async postVideo(req, res, next) {
    try {
      const { title, result, tournament, videoId } = req.body;
      const newVideo = new VideosModel({
        title,
        result,
        tournament,
        linkYoutube: `https://www.youtube.com/watch?v=${videoId}`,
        linkThumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        slug: slugify(title, { lower: true, locale: 'vi' }),
      });
      await newVideo.save();
      res.status(201).json({ newVideo });
    } catch (error) {
      //   res.json(error);
      next(error);
    }
  }
}
module.exports = new VideosController();
