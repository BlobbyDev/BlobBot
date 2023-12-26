const { Schema, model } = require('mongoose');

const ticketSchema = new Schema({
  guildId: {
    type: String,
    required: true,
    unique: true,
  },
  channelId: {
    type: String,
    required: true,
    unique: true,
  },
  categoryId: {
    type: String,
    required: true,
    unique: true,
  },
  roleId: {
    type: String,
    required: true,
  },
  logs: {
    type: String,
    required: true,
  },
});

module.exports = model('TicketSystem', ticketSchema);