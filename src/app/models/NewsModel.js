const mongoose = require('mongoose');
const { Schema } = mongoose;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const NewsSchema = new Schema(
  {
    title: { type: String, required: [true, 'Title không được để trống. Vui lòng thử lại'], trim: true },
    topic: { type: String, required: [true, 'Topic không được để trống. Vui lòng thử lại'], trim: true },
    description: { type: String, trim: true },
    content: { type: String, required: [true, 'Nội dung không được để trống. Vui lòng thử lại'], trim: true },
    views: { type: Number, trim: true },
    thumbnail: { public_id: { type: String, required: true }, secure_url: { type: String, required: true } },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
      },
    ],
    isUserLiked: { type: Boolean, default: false },
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tournament',
    },
    slug: { type: String, slug: 'title', unique: true },
    author: { type: mongoose.Schema.Types.ObjectId },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  {
    timestamps: true,
  }
);
// Query Helper

NewsSchema.query.paginate = function (req) {
  let { _limit, _page } = req.query;
  _limit = parseInt(_limit);
  _page = parseInt(_page) || 1;
  if (_page) {
    const skip = _limit * (_page - 1);
    return this.limit(_limit).skip(skip);
  } else {
    return this;
  }
};
NewsSchema.query.sortable = function (req) {
  const { column, type } = req.query;
  return this.sort({ [column]: type });
};
module.exports = mongoose.model('News', NewsSchema);
