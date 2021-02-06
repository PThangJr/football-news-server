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
    views: { type: Number, trim: true },
    thumbnail: { type: String, },
    likes: { type: Array },
    tournament: { type: String, required: true, trim: true },
    slug: { type: String, slug: 'title', unique: true },
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

module.exports = mongoose.model('news', NewsSchema);
