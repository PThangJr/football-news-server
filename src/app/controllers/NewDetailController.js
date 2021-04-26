const NewsModel = require('../models/NewsModel');
const AuthModel = require('../models/AuthModel');
class DetailNewController {
  constructor() {}

  // [GET] get New by Slug
  async getNewBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const { user } = req;
      const newBySlug = await NewsModel.findOne({ slug })
        .populate({
          path: 'comments',
          populate: { path: 'userId', select: '-password' },
        })
        .populate({
          path: 'video',
        })
        .populate({
          path: 'tournament',
          select: 'name slug _id',
        });
      if (newBySlug) {
        let newUpdated = await NewsModel.updateOne(
          { slug },
          {
            views: newBySlug.views + 1,
          }
        );
        res.status(200).send({ data: newBySlug });
      } else {
        const error = new Error('Bài viết không tồn tại');
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }
  async likedNew(req, res, next) {
    try {
      const { user } = req;
      const { slug } = req.params;
      if (user) {
        let newUpdated;
        const userId = user._id;
        const newBySlug = await NewsModel.findOne({ slug, likes: userId });

        // newUpdated = await NewsModel.updateOne({ slug }, { $addToSet: { likes: { $each: [userId] } } });
        if (!newBySlug) {
          newUpdated = await NewsModel.updateOne({ slug }, { $addToSet: { likes: [userId] } });
        } else {
          newUpdated = await NewsModel.updateOne({ slug }, { $pull: { likes: userId } });
        }
        // await userLiked.save();
        res.status(200).json({ newUpdated, message: 'Like Successfully', userId });
      }
    } catch (error) {
      next(error);
    }
  }
  // async userLiked(req, res, next) {
  //   try {
  //     const { user } = req;
  //     const { slug } = req.params;
  //     const newLiked = await NewsModel.updateMany(
  //       { slug },
  //       {
  //         $push: {
  //           likes: user.id,
  //         },
  //       }
  //     );
  //     res.json({ newLiked });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
module.exports = new DetailNewController();
