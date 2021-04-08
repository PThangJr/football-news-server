const NewsModel = require('../models/NewsModel');
const TournamentsModel = require('../models/TournamentsModel');
const CommentsModel = require('../models/CommentsModel');
const slugify = require('slugify');
const shortid = require('shortid');
const AuthModel = require('../models/AuthModel');
const cloudinary = require('../../cloudinary');
const createError = require('http-errors');
const { create } = require('../models/NewsModel');
// const { pagination } = require('../../config/config');
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString };
    console.log({ before: queryObj });
    const excludedFields = ['page', '_sort', 'limit', 'type', '_search'];
    excludedFields.forEach((ef) => delete queryObj[ef]);
    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, (match) => '$' + match);
    queryStr.title['$options'] = 'i';
    console.log({ after: queryStr });
    this.query.find(JSON.parse(queryStr));
    return this;
  }
}
class NewsController {
  constructor() {}

  //[GET] all news
  async index(req, res, next) {
    try {
      let { limit, page } = req.query;
      limit = parseInt(limit);
      page = parseInt(page);
      const allFootballNews = await NewsModel.find()
        .paginate(req)
        .populate({
          path: 'tournament',
          select: 'name slug _id',
        })
        .sort({ createdAt: -1, updatedAt: -1 })
        .sortable(req);
      const totalItem = await NewsModel.find({}).countDocuments();
      const totalPage = Math.ceil(totalItem / limit);

      if (allFootballNews.length > 0) {
        return res.status(200).json({
          data: allFootballNews,
          pagination: { page, limit, totalItem, totalPage },
        });
      } else {
        throw createError(404, 'Không có dữ liệu');
      }
    } catch (error) {
      next(error);
    }
  }

  //[POST] create new
  async createNew(req, res, next) {
    try {
      const { title, description, content, topic, views, likes, tournament } = req.body;
      if (title && description && content && topic && tournament) {
        var result = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'football-news/thumbnail' });
      }
      // console.log(result);
      const createNew = new NewsModel({
        title,
        description,
        thumbnail: {
          public_id: result ? result.public_id : '',
          secure_url: result ? result.secure_url : '',
        },
        content,
        topic,
        views,
        likes,
        tournament,
        author: req.user.id,
        slug: slugify(title, { lower: true, locale: 'vi' }) + '.' + shortid.generate(),
      });
      const newPost = await createNew.save();
      if (!newPost) {
        throw createError(422, 'Thêm dữ liệu thất bại. Vui lòng thử lại');
      }
      res.status(201).json({ data: newPost, message: 'Thêm dữ liệu thành công' });
    } catch (error) {
      next(error);
    }
  }
  //[DELETE] remove new
  async deleteNewById(req, res) {
    const { newId } = req.params;
    try {
      const newDeleted = await NewsModel.deleteOne({ _id: newId });
      if (!newDeleted) {
        throw createError(404, 'Bài viết không tồn tại');
      }
      res.status(200).json({ newDeleted, message: 'Xóa bài viết thành công' });
    } catch (error) {
      next(error);
    }
  }

  async getNewsByTournament(req, res, next) {
    try {
      const { tournament } = req.params;
      let { limit, page } = req.query;
      limit = parseInt(limit);
      page = parseInt(page);
      const tour = await TournamentsModel.findOne({ slug: tournament });
      // const newByTournament = await NewsModel.find({ tournament: { $in: tour._id } }).paginate(req);
      if (tour) {
        const newByTournament = await NewsModel.find({ tournament: tour._id })
          .populate({ path: 'tournament', select: 'name slug _id' })
          .paginate(req)
          .sort({ createdAt: -1, updatedAt: -1 });
        const totalItem = await NewsModel.find({ tournament: tour._id }).countDocuments();
        let totalPage;
        // Tính tổng số trang
        if (limit) {
          totalPage = Math.ceil(totalItem / limit);
        }
        if (newByTournament.length > 0) {
          res.status(200).json({
            data: newByTournament,
            pagination: { page, limit, totalItem, totalPage },
          });
        } else {
          throw createError(404, 'Không có dữ liệu');
        }
      } else {
        throw createError(404, 'Không có dữ liệu');
      }
      // res.json({ result: req.params.tournament });
    } catch (error) {
      next(error);
    }
  }
  async testUpdate(req, res, next) {
    try {
      Object.keys(req.body).reduce((acc, cur) => {
        return (acc[cur] = req.body[cur]);
      }, {});
    } catch (error) {
      next(error);
    }
  }
  async updateNewById(req, res, next) {
    try {
      const { newId } = req.params;
      const { title, description, content, topic, views, thumbnail } = req.body;
      const newById = await NewsModel.findOne({ _id: newId });
      var result;
      if (newById) {
        if (req.file) {
          const { public_id } = newById.thumbnail;
          const options = {};
          if (public_id) {
            options.public_id = public_id;
            options.overwrite = true;
          } else {
            options.folder = 'football-news/thumbnail';
          }
          result = await cloudinary.v2.uploader.upload(req.file.path, options);
        }
        let update;
        update = req.body;
        if (result) {
          update.thumbnail = {
            public_id: result.public_id,
            secure_url: result.secure_url,
          };
        }
        if (title) {
          update.slug = slugify(title, { lower: true, locale: 'vi' }) + '.' + shortid.generate();
        }
        const newUpdated = await NewsModel.updateOne({ _id: newId }, update);
        res.status(201).json({ newUpdated, message: 'Cập nhật bài viết thành công' });
      } else {
        throw createError(404, 'Bài viết không tồn tại');
      }
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
  async findTitleNew(req, res, next) {
    try {
      const { search } = req.query;
      const newMatched = await NewsModel.find({ title: { $regex: /{search}/ } });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new NewsController();
