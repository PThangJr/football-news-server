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
          path: 'tournament',
          select: 'name slug _id',
        });
      if (newBySlug) {
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
        const userId = user.id;
        const newBySlug = await NewsModel.findOne({ slug });
        let { likes } = newBySlug;
        const indexNew = likes.indexOf(userId);
        if (indexNew !== -1) {
          // likes = likes.filter((item) => item !== userId);
          likes.splice(indexNew, 1);
        } else {
          likes.push(userId);
        }
        await newBySlug.save();
        const isLiked = likes.include(req.user.id);
        // const indexUser = userLiked.like_news.indexOf(newBySlug._id);
        // if (indexUser !== -1) {
        //   userLiked.like_news.splice(indexUser, 1);
        // } else {
        //   userLiked.like_news.push(newBySlug._id);
        // }

        // await userLiked.save();
        res.status(200).json({ liked: isLiked });
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
