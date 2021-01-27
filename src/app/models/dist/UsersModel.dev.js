"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
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
module.exports = new mongoose.model('users', userSchema);