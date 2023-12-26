const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    guildId: {
        type: String,
        required: true,
    },
    channelId: {
        type: String,
        required: true,
    },
    ignoredChannelId: {
        type: String,
        required: false
    },
});

module.exports = model('MessageLog', messageSchema);