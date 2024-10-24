const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    barcode: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Zone = mongoose.model('Zone', zoneSchema);
module.exports = Zone;
