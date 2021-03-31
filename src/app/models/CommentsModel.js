const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Auth' },
  newId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'News' },
  content: { type: String, require: true, trim: true },
});

module.exports = mongoose.model('Comment', CommentsSchema);
