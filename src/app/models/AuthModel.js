const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

const authSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Tài khoản không được để trống'],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email không được để trống'],
      trim: true,
      unique: true,
    },
    password: { type: String, required: [true, 'Password không được để trống'], trim: true },
    // rePassword: { type: String, required: true, trim: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    liked: { type: Array, default: [], ref: 'News' },
    fullname: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['Nam', 'Nữ', 'Khác'],
      trim: true,
    },
    avatar: {
      public_id: { type: String, trim: true, unique: true, default: 'football-news/avatars/default_avatar' },
      secure_url: {
        type: String,
        trim: true,
        unique: true,
        default:
          'https://res.cloudinary.com/dbfyyqmwr/image/upload/v1617707300/football-news/avatars/default_avatar.png',
      },
    },
  },
  {
    timestamps: true,
  }
);
// authSchema.plugin(uniqueValidator, { message: `{PATH} đã tồn tại. Vui lòng nhập lại` });
module.exports = mongoose.model('Auth', authSchema);
