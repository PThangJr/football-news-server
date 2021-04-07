const mongoose = require('mongoose');
const resultsSchema = mongoose.Schema(
  {
    home: {
      clubId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Club',
      },
      scores: [
        {
          player: { type: String, trim: true },
          own_goal: { type: Boolean, default: false },
          penalty: { type: Boolean, default: false },
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
          goalAt: { type: Date, required: true },
          ownGoal: { type: Boolean, default: false },
        },
      ],
      goals: { type: Number, default: 0 },
    },
    tournament: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Tournament' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Result', resultsSchema);
