const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);
const TournamentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, slug: 'name', unique: true },
    logo: {
      public_id: { type: String, trim: true, unique: true },
      secure_url: { type: String, trim: true, unique: true },
    },
  },
  { timestamps: true }
);
TournamentSchema.query.sortable = function (req) {
  const { column, type } = req.query;
  return this.sort({ [column]: type });
};
TournamentSchema.query.findAndFilter = function (req) {
  const { search } = req.query;
  return this.find({});
};
module.exports = mongoose.model('Tournament', TournamentSchema);
