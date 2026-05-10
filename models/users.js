const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return /^https?:\/\/(www\.)?[._~:/?%#[]@!$&'()*+,;=]\/?/.test(value);
      },
      message: 'invalid URL',
    },
  },
});

module.exports = mongoose.model('User', userSchema);
