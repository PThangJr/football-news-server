const ResultsModel = require('../models/ResultsModel');

class ResultsController {
  //[GET] Get Results
  async getAllResults(req, res, next) {
    try {
      const allResults = await ResultsModel.find()
        .populate({ path: 'home', populate: { path: 'clubId' } })
        .populate({ path: 'away', populate: { path: 'clubId' } });
      res.status(200).json({ allResults });
    } catch (error) {
      next(error);
    }
  }
  // [POST] post results
  async postResult(req, res, next) {
    try {
      const newObject = { ...req.body };
      newObject.home.goals = newObject.home.scores.length;
      newObject.away.goals = newObject.away.scores.length;

      const newResult = new ResultsModel(newObject);
      await newResult.save();
      res.status(201).json({ newResult, message: 'Thêm kết quả mới thành công' });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new ResultsController();
