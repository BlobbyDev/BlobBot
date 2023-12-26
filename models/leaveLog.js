const { Schema, model } = require('mongoose');

const leaveSchema = new Schema({
    guildId: {
        type: String,
        required: true,
    },
    channelId: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
});

module.exports = model('LeaveLog', leaveSchema);