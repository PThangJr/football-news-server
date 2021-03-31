const CommentsModel = require('../models/CommentsModel');
const NewsModel = require('../models/NewsModel');
class CommentsController {
  constructor() {}
  // [POST] Post comment in a new
  async comment(req, res, next) {
    try {
      const { user } = req;
      const { newId } = req.params;
      const { content } = req.body;
      const newComment = new CommentsModel({
        newId,
        userId: user.id,
        content,
      });
      await newComment.save();
      const newUpdated = await NewsModel.updateOne(
        { _id: newId },
        {
          $push: {
            comments: newComment._id,
          },
        }
      );
      res.json({ newUpdated });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new CommentsController();
