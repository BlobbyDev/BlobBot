const { Schema, model } = require('mongoose');

const levelingEnabledGuildSchema = new Schema({
  guildId: {
    type: String,
    required: true,
  },
});

module.exports = model('LevelingEnabledGuild', levelingEnabledGuildSchema);