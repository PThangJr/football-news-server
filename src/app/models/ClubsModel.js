const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    logo: {
      public_id: { type: String, trim: true, unique: true },
      secure_url: { type: String, trim: true, unique: true },
    },
    shortname: {
      type: String,
      trim: true,
    },
    codename: {
      type: String,
      required: true,
      trim: true,
    },
    tournaments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Tournament',
      },
    ],
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    results: [{ type: mongoose.Schema.Types.ObjectId }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Club', clubSchema);
