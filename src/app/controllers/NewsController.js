const NewsModel = require('../models/NewsModel');
const TournamentsModel = require('../models/TournamentsModel');
const CommentsModel = require('../models/CommentsModel');
const slugify = require('slugify');
const shortid = require('shortid');
const AuthModel = require('../models/AuthModel');
const cloudinary = require('../../cloudinary');
// const { pagination } = require('../../config/config');
class NewsController {
  constructor() {}

  //[GET] all news
  async index(req, res, next) {
    try {
      const allFootballNews = await NewsModel.find({}).paginate(req).populate({
        path: 'tournament',
        select: 'name slug _id',
      });
      const total = await NewsModel.find({}).countDocuments();

      if (allFootballNews.length > 0) {
        return res.status(200).json({ data: allFootballNews, total });
      } else {
        const error = new Error('Không có dữ liệu');
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }

  //[GET] new by id

  //[POST] create new
  async createNew(req, res, next) {
    try {
      const { title, description, content, topic, views, likes, tournament } = req.body;
      const result = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'football-news/thumbnail' });
      // console.log(result);
      const createNew = new NewsModel({
        title,
        description,
        thumbnail: {
          public_id: result.public_id,
          secure_url: result.secure_url,
        },
        content,
        topic,
        views,
        likes,
        tournament,
        author: req.user.id,
        slug: slugify(title, { lower: true }) + '.' + shortid.generate(),
      });
      const newPost = await createNew.save();
      if (!newPost) {
        const error = new Error('Thêm dữ liệu thất bại. Vui lòng thử lại');
        error.statusCode = 422;
        throw error;
      }
      res.status(200).json({ data: newPost, message: 'Thêm dữ liệu thành công' });
    } catch (error) {
      next(error);
    }
  }
  //[DELETE] remove new
  async removeNew(req, res) {
    const { newId } = req.params;
    try {
      const deletedNew = await NewsModel.deleteOne({ _id: newId });
      if (!deletedNew) {
        const error = new Error('Bài viết không tồn tại');
        error.statusCode = 404;
        throw error;
      }
      res.json(deletedNew);
    } catch (error) {
      next(error);
      // res.json({ message: error });
    }
  }

  async getNewsByTournament(req, res, next) {
    try {
      const { tournament } = req.params;
      const tour = await TournamentsModel.findOne({ slug: tournament });
      // const newByTournament = await NewsModel.find({ tournament: { $in: tour._id } }).paginate(req);
      const newByTournament = await NewsModel.find({ tournament: tour._id })
        .populate({ path: 'tournament', select: 'name slug _id' })
        .paginate(req);
      const total = await NewsModel.find({ tournament: tour._id }).countDocuments();
      res.status(200).json({ data: newByTournament, total });
      // res.json({ result: req.params.tournament });
    } catch (error) {}
  }
  async updateNewByTournament(req, res, next) {
    try {
      const { newId } = req.params;
      const { title, description, content, topic, views, likes, thumbnail, comments } = req.body;
      let update;
      if (title) {
        update = {
          title,
          description,
          content,
          topic,
          views,
          likes,
          thumbnail,
          slug: slugify(title, { lower: true }) + '.' + shortid.generate(),
        };
      } else {
        update = { title, description, content, topic, views, likes };
      }
      const newUpdated = await NewsModel.updateOne({ _id: newId }, update);
      res.json({ newUpdated });
    } catch (error) {
      next(error);
    }
  }
  async getComments(req, res, next) {
    try {
      const { slug } = req.params;
      const newBySlug = await NewsModel.findOne({ slug });
      if (newBySlug) {
        const comment = await CommentsModel.find({ newId: newBySlug._id, _id: { $in: newBySlug.comments } }).populate({
          path: 'userId',
          select: '-password',
        });

        res.json({ comment });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new NewsController();
