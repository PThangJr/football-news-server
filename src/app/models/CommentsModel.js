const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Auth' },
    newId: { type: mongoose.Schema.Types.ObjectId, required: true },
    target: { type: String, enum: ['News', 'Videos'] },
    content: { type: String, require: true, trim: true },
  },

  { timestamps: true }
);

CommentsSchema.query.paginate = function (req) {
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
module.exports = mongoose.model('Comment', CommentsSchema);
