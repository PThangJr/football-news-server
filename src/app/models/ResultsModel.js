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
      redCard: [
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
    },
    slug: {
      type: String,
      require: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Result', resultsSchema);
