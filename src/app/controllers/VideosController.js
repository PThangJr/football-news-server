const VideosModel = require('../models/VideosModel');
const slugify = require('slugify');
const shortid = require('shortid');
const createError = require('http-errors');
const TournamentsModel = require('../models/TournamentsModel');
class VideosController {
  async getAll(req, res, next) {
    try {
      let { limit, page } = req.query;
      limit = parseInt(limit);
      page = parseInt(page);
      const videos = await VideosModel.find()
        .populate({ path: 'result' })
        .populate({ path: 'tournaments' })
        .paginate(req)
        .sort({ createdAt: -1, updateAt: -1 });
      const totalItem = await VideosModel.find().countDocuments();
      const totalPage = Math.ceil(totalItem / limit);
      res.status(200).json({ videos, pagination: { limit, page, totalItem, totalPage } });
    } catch (error) {
      next(error);
    }
  }
  async getTournamentVideo(req, res, next) {
    try {
      const { tournamentSlug } = req.params;
      let { limit, page } = req.query;
      limit = parseInt(limit);
      page = parseInt(page);
      const tournament = await TournamentsModel.findOne({ slug: tournamentSlug });

      const videos = await VideosModel.find({ tournaments: tournament._id })
        .populate('tournaments')
        .paginate(req)
        .sort({ createdAt: -1, updatedAt: -1 });
      if (!tournament || videos.length === 0) {
        const error = createError(404, 'Video không tồn tại!');
        throw error;
      }
      const totalItem = await VideosModel.find({ tournaments: tournament._id }).countDocuments();
      const totalPage = Math.ceil(totalItem / limit);
      res.status(200).json({ videos, pagination: { limit, page, totalItem, totalPage } });
    } catch (error) {
      next(error);
    }
  }
  async getVideoBySlug(req, res, next) {
    try {
      const { videoSlug } = req.params;
      const video = await VideosModel.findOne({ slug: videoSlug }).populate('tournament');
      res.status(200).json({ video });
    } catch (error) {
      next(error);
    }
  }
  async postVideo(req, res, next) {
    try {
      const { title, result, tournaments, videoId, author } = req.body;
      const newVideo = new VideosModel({
        title,
        result,
        tournaments: JSON.parse(tournaments),
        videoId,
        author,
        linkYoutube: `https://www.youtube.com/watch?v=${videoId}`,
        linkThumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        slug: slugify(title, { lower: true, locale: 'vi' }) + '.' + shortid.generate(),
      });
      await newVideo.save();
      res.status(201).json({ newVideo, message: 'Thêm mới video thành công' });
    } catch (error) {
      //   res.json(error);
      next(error);
    }
  }
}
module.exports = new VideosController();
