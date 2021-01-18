"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var NewsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    required: true
  },
  likes: {
    type: Number,
    required: true
  }
}, {
  timestamps: {
    currentTime: function currentTime() {
      return Math.floor(Date.now() / 1000);
    }
  }
});
module.exports = mongoose.model('news', NewsSchema);