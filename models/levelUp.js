const { Schema, model } = require('mongoose');

const levelUpSchema = new Schema({
    guildId: {
        type: String,
        required: true,
    },
    channelId: {
        type: String,
        required: true,
    },
});

module.exports = model('LevelUp', levelUpSchema);