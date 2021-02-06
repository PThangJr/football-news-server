const NewsModel = require('../models/NewsModel');
// const { pagination } = require('../../config/config');
class NewsController {
  constructor() {}

  //[GET] all news
  async index(req, res, next) {
    try {
      const allFootballNews = await NewsModel.find({}).paginate(req);
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
  async getNewsById(req, res) {
    const { newId } = req.params;
    try {
      const newById = await NewsModel.findById(newId).exec();
      if (newById) {
        return res.status(200).json({ data: newById });
      } else {
        return res.status(400).json({ message: 'Dữ liệu không tồn tại!' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Can not find news!!!' });
    }
  }
  //[GET] new by slug
  async getNewBySlug(req, res, next) {
    const { slug } = req.params;
    try {
      const newBySlug = await NewsModel.findOne({ slug }).exec();
      if (newBySlug) {
        return res.status(200).json({ data: newBySlug });
      } else {
        const error = new Error('Bài viết không tồn tại');
        error.statusCode = 404;
        throw error;
        // return res.status(400).json({ message: 'Dữ liệu không tồn tại' });
      }
    } catch (error) {
      next(error);
      // res.status(500).json({ message: 'Can not find news!!!' });
    }
  }
  //[POST] create new
  async createNew(req, res, next) {
    try {
      const { title, description, content, thumbnail, topic, views, likes, tournament } = req.body;
      // console.log(req.body);
      const createNew = new NewsModel({
        title,
        description,
        thumbnail,
        content,
        topic,
        views,
        likes,
        tournament,
      });
      const newPost = await createNew.save();
      if (!newPost) {
        const error = new Error('Thêm dữ liệu thất bại. Vui lòng thử lại');
        error.statusCode = 422;
        throw error;
      }
      res.status(200).json({ data: newPost, message: 'Thêm dữ liệu thành công' });
    } catch (error) {
      // res.json(error);
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

  // [DELETE] delete by slug
  async removeNewBySlug(req, res, next) {
    try {
      const { slug } = req.params;

      const newBySlug = await NewsModel.findOneAndDelete({ slug });
      if (!newBySlug) {
        const error = new Error('Bài viết không tồn tại. Vui lòng thử lại');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ data: newBySlug, message: 'Xóa bài viết thành công' });
    } catch (error) {
      next(error);
    }
  }

  // [PUT] Update new
  async updateNew(req, res) {
    try {
      const { newId } = req.params;
      const { title, description, content, topic, views, likes } = req.body;
      const updatedNew = await NewsModel.updateOne(
        { _id: newId },
        { title, description, content, topic, views, likes }
      );
      res.json(updatedNew);
    } catch (error) {
      res.json({ message: error });
    }
  }
  // [PUT] Update new by Slug
  async updateNewBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const { title, description, content, topic, tournament, thumbnail } = req.body;
      const updatedNew = await NewsModel.findOneAndUpdate(
        { slug },
        { title, thumbnail, description, content, topic, tournament }
      );
      if (!updatedNew) {
        const error = new Error('Bài viết không tồn tại. Vui lòng thử lại');
        error.statusCode = 404;
        throw error;
      }
      return res.status(200).json({ data: updatedNew, message: 'Sửa bài viết thành công' });
    } catch (error) {
      next(error);
    }
  }
  // [GET] Premier League
  async getPremierLeague(req, res) {
    try {
      const premierLeague = await NewsModel.find({ topic: 'Premier League' }).paginate(req);
      const total = await NewsModel.find({ topic: 'Premier League' }).countDocuments();
      // console.log(total);
      res.json({ data: premierLeague, total });
    } catch (error) {
      res.json({ message: error });
    }
  }
  //[GET] La Liga
  async getLaLiga(req, res) {
    try {
      const laLiga = await NewsModel.find({ topic: 'La Liga' }).paginate(req);
      const total = await NewsModel.find({ topic: 'La Liga' }).countDocuments();
      res.json({ data: laLiga, total });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  //[GET] Serie A
  async getSerieA(req, res) {
    try {
      const serieA = await NewsModel.find({ topic: 'Serie A' }).paginate(req);
      const total = await NewsModel.find({ topic: 'Serie A' }).countDocuments();
      res.json({ data: serieA, total });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  //[GET] Ligue 1
  async getLigue1(req, res) {
    try {
      const ligue1 = await NewsModel.find({ topic: 'Ligue 1' }).paginate(req);
      const total = await NewsModel.find({ topic: 'Ligue 1' }).countDocuments();

      res.json({ data: ligue1, total });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  //[GET] Bundesliga
  async getBundesliga(req, res) {
    try {
      const bundesliga = await NewsModel.find({ topic: 'Bundesliga' }).paginate(req);
      const total = await NewsModel.find({ topic: 'Bundesliga' }).countDocuments();
      res.json({ data: bundesliga, total });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new NewsController();
