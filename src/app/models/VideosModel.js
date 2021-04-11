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
    videoId: {
      type: String,
      require: true,
      trim: true,
    },
    author: {
      type: String,
      trim: true,
    },
    channelId: { type: String, trim: true },
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
