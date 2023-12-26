const { Schema, model } = require('mongoose');

const blacklistSchema = new Schema({
  userId: {
    type: String,
    required: true,
  }
});

module.exports = model('Blacklist', blacklistSchema);