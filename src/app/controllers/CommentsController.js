const CommentsModel = require('../models/CommentsModel');
const NewsModel = require('../models/NewsModel');
const createError = require('http-errors');
class CommentsController {
  constructor() {}

  //[GET] Get all comment
  //[GET] Get comment by slug new
  async getCommentBySlugNew(req, res, next) {
    try {
      const { slugNew } = req.params;
      let { limit, page } = req.query;
      const newBySlug = await NewsModel.findOne({ slug: slugNew });
      if (newBySlug) {
        const commentBySlug = await CommentsModel.find({ newId: newBySlug._id })
          .paginate(req)
          .populate({ path: 'userId', select: 'username avatar _id' })
          .sort({ createdAt: -1 });

        const totalItem = await CommentsModel.find({ newId: newBySlug._id }).countDocuments();
        const totalPage = Math.ceil(totalItem / limit);
        if (page > totalPage) {
          page = 1;
        }
        res.status(200).json({ comments: commentBySlug, pagination: { limit, page, totalItem, totalPage } });
      } else {
        throw createError(404, 'Bài viết không tồn tại');
      }
    } catch (error) {
      next(error);
    }
  }

  // [POST] Post comment in a new
  async postComment(req, res, next) {
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
      res.status(201).json({ newUpdated });
    } catch (error) {
      next(error);
    }
  }
  // [POST] Post comment with slug new
  async postCommentBySlugNew(req, res, next) {
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
  // [DELETE] comment by id
  async deleteCommentById(req, res, next) {
    try {
      const { commentId } = req.params;
      const { user } = req;
      // const commentDeleted = await CommentsModel.findByIdAndDelete(commentId);
      const comment = await CommentsModel.findOne({ _id: commentId });
      if (comment.userId == user.id) {
        const commentDeleted = await CommentsModel.findByIdAndDelete(commentId).populate({
          path: 'userId',
          select: 'username avatar _id',
        });
        res.json({ status: 'Success', message: 'Xóa bài viết thành công!', commentDeleted });
      } else {
        throw createError(400, 'Lỗi đăng nhập tài khoản. Vui lòng thử lại');
      }
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new CommentsController();
