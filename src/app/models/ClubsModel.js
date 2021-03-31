const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  logo: {
    public_id: { type: String, trim: true, unique: true },
    secure_url: { type: String, trim: true, unique: true },
  },
  shortname: {
    type: String,
    required: true,
    trim: true,
  },
  tournament: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tournament',
    },
  ],
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

module.exports = mongoose.model('club', clubSchema);
