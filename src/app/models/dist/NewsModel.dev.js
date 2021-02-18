"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var slug = require('mongoose-slug-generator');

mongoose.plugin(slug);
var NewsSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title không được để trống. Vui lòng thử lại'],
    trim: true
  },
  topic: {
    type: String,
    required: [true, 'Topic không được để trống. Vui lòng thử lại'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Nội dung không được để trống. Vui lòng thử lại'],
    trim: true
  },
  views: {
    type: Number,
    trim: true
  },
  thumbnail: {
    type: String
  },
  likes: {
    type: Array
  },
  tournament: {
    type: String,
    required: [true, 'Tournament không được để trống. Vui lòng thử lại'],
    trim: true
  },
  slug: {
    type: String,
    slug: 'title',
    unique: true
  }
}, {
  timestamps: true
}); // Query Helper

NewsSchema.query.paginate = function (req) {
  var _req$query = req.query,
      _limit = _req$query._limit,
      _page = _req$query._page;
  _limit = parseInt(_limit);
  _page = parseInt(_page) || 1;

  if (_page) {
    var skip = _limit * (_page - 1);
    return this.limit(_limit).skip(skip);
  } else {
    return this;
  }
};

module.exports = mongoose.model('news', NewsSchema);