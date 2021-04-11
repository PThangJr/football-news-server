const ResultsModel = require('../models/ResultsModel');
const TournamentsModel = require('../models/TournamentsModel');
const slugify = require('slugify');
const shortid = require('shortid');
class ResultsController {
  //[GET] Get Results
  async getAllResults(req, res, next) {
    try {
      const allResults = await ResultsModel.find()
        .populate({ path: 'home', populate: { path: 'clubId' } })
        .populate({ path: 'away', populate: { path: 'clubId' } })
        .populate({ path: 'video' })
        .populate({ path: 'tournament' })
        .sort({ endTime: -1 });
      res.status(200).json({ allResults });
    } catch (error) {
      next(error);
    }
  }
  //[GET] Get all Results by tournament
  async getAllResultsByTournament(req, res, next) {
    try {
      const { tournamentSlug } = req.params;
      const tournament = await TournamentsModel.findOne({ slug: tournamentSlug });
      const tournamentResults = await ResultsModel.find({ tournament: tournament._id })
        .populate({ path: 'home', populate: { path: 'clubId' } })
        .populate({ path: 'away', populate: { path: 'clubId' } })
        .populate({ path: 'video' })
        .populate({ path: 'tournament' })
        .sort({ endTime: -1 });
      res.status(200).json({ tournamentResults });
    } catch (error) {
      next(error);
    }
  }
  //[GET] Get results by slug
  async getResultBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const result = await ResultsModel.findOne({ slug })
        .populate({ path: 'home', populate: { path: 'clubId' } })
        .populate({ path: 'away', populate: { path: 'clubId' } })
        .populate({ path: 'tournament' })
        .populate({ path: 'video' });
      res.status(200).json({ result });
    } catch (error) {
      next(error);
    }
  }
  // [POST] post results
  async postResult(req, res, next) {
    try {
      const newObject = { ...req.body };

      newObject.home.goals = newObject.home.scores ? newObject.home.scores.length : 0;
      newObject.away.goals = newObject.away.scores ? newObject.away.scores.length : 0;
      newObject.slug = slugify(newObject.title, { lower: true, locale: 'vi' }) + '.' + shortid.generate();
      const newResult = new ResultsModel(newObject);
      await newResult.save();
      res.status(201).json({ newResult, message: 'Thêm kết quả mới thành công' });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new ResultsController();
