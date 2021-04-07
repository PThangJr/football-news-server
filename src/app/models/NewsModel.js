const mongoose = require('mongoose');
const { Schema } = mongoose;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const NewsSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    topic: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    content: { type: String, required: true, trim: true },
    views: { type: Number, trim: true, default: 0 },
    thumbnail: { public_id: { type: String, required: true }, secure_url: { type: String, required: true } },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
      },
    ],
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tournament',
    },
    slug: { type: String, slug: 'title', unique: true },
    author: { type: mongoose.Schema.Types.ObjectId },
    trending: { type: Number, default: -1 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  {
    timestamps: true,
  }
);
// Query Helper

NewsSchema.query.paginate = function (req) {
  let { limit, page } = req.query;
  limit = parseInt(limit);
  page = parseInt(page) || 1;
  if (page) {
    const skip = limit * (page - 1);
    return this.limit(limit).skip(skip);
  } else {
    return this;
  }
};
NewsSchema.query.sortable = function (req) {
  const { column, type } = req.query;
  return this.sort({ [column]: type });
};
module.exports = mongoose.model('News', NewsSchema);
