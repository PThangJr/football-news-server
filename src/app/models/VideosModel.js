const mongoose = require('mongoose');

const videosSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    result: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Result',
    },
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      default: 'Others',
      ref: 'Tournament',
    },
    linkYoutube: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    linkThumbnail: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Video', videosSchema);
