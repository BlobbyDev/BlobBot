const { Schema, model } = require('mongoose');

const inventorySchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    diamond: {
        type: Number,
        default: 0,
        required: false,
    },
    gold: {
        type: Number,
        default: 0,
        required: false,
    },
    iron: {
        type: Number,
        default: 0,
        required: false,
    },
    wood: {
        type: Number,
        default: 0,
        required: false,
    },
    shit: {
        type: Number,
        default: 0,
        required: false,
    },
});

module.exports = model('Inventory', inventorySchema);