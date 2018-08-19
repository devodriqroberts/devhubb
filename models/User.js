const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

// 4. Create Schema
const UserSchema = new Schema({
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: moment().format()
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model('users', UserSchema);