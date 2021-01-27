const NewsModel = require('../models/NewsModel');
// const { pagination } = require('../../config/config');
class NewsController {
  constructor() {}

  //[GET] all news
  async index(req, res) {
    // let { _limit, _page } = req.query;
    // _limit = parseInt(_limit) || pagination.limit;
    // _page = parseInt(_page) || 1;
    // const skip = _limit * parseInt(_page - 1);
    try {
      const allFootballNews = await NewsModel.find({}).paginate(req);
      if (allFootballNews.length > 0) {
        res.status(200).json(allFootballNews);
      } else {
        res.json({ message: `Page ${_page} is not exist!!` });
      }
    } catch (error) {
      res.json({ message: error });
    }
  }

  //[GET] new by id
  async getNewsById(req, res) {
    const { newId } = req.params;
    try {
      const newById = await NewsModel.findById(newId).exec();
      res.status(200).json(newById);
    } catch (error) {
      res.status(500).json({ message: 'Can not find news!!!' });
    }
  }
  //[POST] create new
  async createNew(req, res) {
    const { title, description, content, topic, views, likes } = req.body;
    const createNew = new NewsModel({
      title,
      description,
      content,
      topic,
      views,
      likes,
    });
    try {
      const newPost = await createNew.save();
      res.json(newPost);
    } catch (error) {
      res.json({ message: error });
    }
  }
  //[DELETE] remove new
  async removeNew(req, res) {
    const { newId } = req.params;
    try {
      const deletedNew = await NewsModel.deleteOne({ _id: newId });
      res.json(deletedNew);
    } catch (error) {
      res.json({ message: error });
    }
  }

  // [PUT] Update new
  async updateNew(req, res) {
    const { newId } = req.params;
    const { title, description, content, topic, views, likes } = req.body;
    try {
      const updatedNew = await NewsModel.updateOne(
        { _id: newId },
        { title, description, content, topic, views, likes }
      );
      res.json(updatedNew);
    } catch (error) {
      res.json({ message: error });
    }
  }
  // [GET] Premier League
  async getPremierLeague(req, res) {
    try {
      const premierLeague = await NewsModel.find({ topic: 'Premier League' }).paginate(req);
      res.json(premierLeague);
    } catch (error) {
      res.json({ message: error });
    }
  }
  //[GET] La Liga
  async getLaLiga(req, res) {
    try {
      const laLiga = await NewsModel.find({ topic: 'La Liga' }).paginate(req);
      res.json(laLiga);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  //[GET] Serie A
  async getSerieA(req, res) {
    try {
      const serieA = await NewsModel.find({ topic: 'Serie A' }).paginate(req);
      res.json(serieA);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  //[GET] Ligue 1
  async getLigue1(req, res) {
    try {
      const ligue1 = await NewsModel.find({ topic: 'Ligue 1' }).paginate(req);
      res.json(ligue1);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  //[GET] Bundesliga
  async getBundesliga(req, res) {
    try {
      const bundesliga = await NewsModel.find({ topic: 'Bundesliga' }).paginate(req);
      res.json(bundesliga);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new NewsController();
