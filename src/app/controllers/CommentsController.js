const CommentsModel = require('../models/CommentsModel');
const NewsModel = require('../models/NewsModel');
class CommentsController {
  constructor() {}

  //[GET] Get comment by slug new
  async getCommentBySlugNew(req, res, next) {
    try {
      const { slugNew } = req.params;
      const newBySlug = await NewsModel.findOne({ slug: slugNew });
      const commentBySlug = await CommentsModel.find({ newId: newBySlug._id })
        .paginate(req)
        .populate({ path: 'userId', select: 'username avatar _id' })
        .sort({ createdAt: -1 });
      res.status(200).json({ commentBySlug });
    } catch (error) {
      next(error);
    }
  }

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
  // [POST] Post comment with slug new
  async commentBySlug(req, res, next) {
    try {
      const { slugNew } = req.params;
      const { user } = req;
      const { content } = req.body;

      const newBySlug = await NewsModel.findOne({ slug: slugNew });
      const newComment = new CommentsModel({
        newId: newBySlug._id,
        userId: user.id,
        content,
      });
      await newComment.save();
      const newUpdated = await NewsModel.updateOne(
        { _id: newBySlug._id },
        {
          $push: {
            comments: newComment._id,
          },
        }
      );
      const comment = await CommentsModel.findOne({ _id: newComment._id }).populate({
        path: 'userId',
        select: 'username avatar _id',
      });

      res.status(200).json({ newComment: comment });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new CommentsController();
