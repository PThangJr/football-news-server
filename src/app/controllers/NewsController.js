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
      let { limit, page, search } = req.query;
      // console.log('Searching..', search);
      limit = parseInt(limit);
      page = parseInt(page);
      let regex;
      const query = {};
      if (search) {
        regex = new RegExp(req.query.search, 'iu');
        query.title = regex;
      }
      const allFootballNews = await NewsModel.find(query)
        .paginate(req)
        .populate({
          path: 'tournaments',
          select: 'name slug _id',
        })
        .sort({ createdAt: -1, updatedAt: -1 })
        .sortable(req);
      const totalItem = await NewsModel.find(query).countDocuments();
      const totalPage = Math.ceil(totalItem / limit);

      if (allFootballNews.length > 0) {
        return res.status(200).json({
          data: allFootballNews,
          pagination: { page, limit, totalItem, totalPage },
        });
      } else {
        throw createError(404, 'Không có bài viết nào');
      }
    } catch (error) {
      next(error);
    }
  }

  //[POST] create new
  async createNew(req, res, next) {
    try {
      const newObj = { ...req.body };
      let { title, description, content, topic, tournaments } = req.body;
      if (req.file && title && description && content && topic && tournaments) {
        var result = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'football-news/thumbnail' });
      }
      tournaments = JSON.parse(tournaments);
      newObj.thumbnail = {};
      newObj.thumbnail.public_id = result.public_id;
      newObj.thumbnail.secure_url = result.secure_url;
      newObj.author = req.user._id;
      newObj.slug = slugify(title, { lower: true, locale: 'vi' }) + '.' + shortid.generate();
      newObj.tournaments = Array.isArray(tournaments) ? [...tournaments] : [tournaments];
      const createNew = new NewsModel({
        ...newObj,
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
      let thumbnailDeleted;
      const newItem = await NewsModel.findOne({ _id: newId });
      if (newItem.thumbnail.hasOwnProperty('public_id')) {
        thumbnailDeleted = await cloudinary.v2.uploader.destroy(newItem.thumbnail.public_id);
      }
      if (thumbnailDeleted) {
        const newDeleted = await NewsModel.deleteOne({ _id: newId });
        if (!newDeleted) {
          throw createError(404, 'Bài viết không tồn tại');
        }
        res.status(200).json({ newDeleted, message: 'Xóa bài viết thành công' });
      } else {
        const error = createError(400, 'Lỗi. Xóa bài viết không thành công!');
        throw error;
      }
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
        const newByTournament = await NewsModel.find({ tournaments: tour._id })
          .populate({ path: 'tournaments', select: 'name slug _id' })
          .paginate(req)
          .sort({ createdAt: -1, updatedAt: -1 });
        const totalItem = await NewsModel.find({ tournaments: tour._id }).countDocuments();
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
          throw createError(404, 'Không có bài viết nào');
        }
      } else {
        throw createError(404, 'Không có bài viết nào');
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
  async searchNews(req, res, next) {
    try {
      let { limit, page } = req.query;
      console.log(req.body, req.query);
      limit = parseInt(limit);
      page = parseInt(page);
      const regex = new RegExp(req.query.search, 'iu');
      const newsFound = await NewsModel.find({ title: regex }).paginate(req);
      const totalItem = await NewsModel.find({ title: regex }).countDocuments();
      const totalPage = Math.ceil(totalItem / limit);

      res.status(200).json({ newsFound, pagination: { page, limit, totalItem, totalPage } });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new NewsController();
