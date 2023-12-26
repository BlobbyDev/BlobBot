const { Schema, model } = require('mongoose');

const antiToxictySchema = new Schema({
    guildId: {
        type: String,
        required: true,
    },
    channelId: {
        type: String,
        required: true,
    },
    severity: {
        type: Number,
        required: true,
    },
    ignoredChannelId: {
        type: String,
        required: false
    },
    bypassRoleId: {
        type: String,
        required: false
    }
});

module.exports = model('AntiToxicity', antiToxictySchema);