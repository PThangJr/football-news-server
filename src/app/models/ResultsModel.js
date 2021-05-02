const mongoose = require('mongoose');
const resultsSchema = mongoose.Schema(
  {
    title: { type: String, trim: true, require: true },
    home: {
      clubId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Club',
      },
      scores: [
        {
          player: { type: String, trim: true },
          goalAt: { type: String, require: true, trim: true },
          own_goal: { type: Boolean, default: false },
          penalty: { type: Boolean, default: false },
        },
      ],
      redCards: [
        {
          player: { type: String, trim: true },
          time: { type: String, trim: true },
        },
      ],
      goals: { type: Number, default: 0 },
    },
    away: {
      clubId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Club',
      },
      scores: [
        {
          player: { type: String, trim: true },
          goalAt: { type: String, required: true },
          ownGoal: { type: Boolean, default: false },
          penalty: { type: Boolean, default: false },
        },
      ],
      redCards: [
        {
          player: { type: String, trim: true },
          time: { type: String, trim: true },
        },
      ],
      goals: { type: Number, default: 0 },
    },
    tournament: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Tournament' },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
    },
    endTime: {
      type: Date,
      require: true,
      default: Date.now,
    },
    slug: {
      type: String,
      require: true,
      trim: true,
    },
  },
  { timestamps: true }
);
resultsSchema.query.paginate = function (req) {
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
module.exports = mongoose.model('Result', resultsSchema);
