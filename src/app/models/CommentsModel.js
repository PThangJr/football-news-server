const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Auth' },
    newId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'News' },
    content: { type: String, require: true, trim: true },
  },
  { timestamps: true }
);

CommentsSchema.query.paginate = function (req) {
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
module.exports = mongoose.model('Comment', CommentsSchema);
