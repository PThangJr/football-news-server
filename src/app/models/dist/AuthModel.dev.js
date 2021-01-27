"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var authSchema = new Schema({
  username: {
    type: String,
    require: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
    trim: true
  },
  rePassword: {
    type: String,
    require: true,
    trim: true
  },
  role: {
    type: Number,
    "default": 1
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('auths', authSchema);