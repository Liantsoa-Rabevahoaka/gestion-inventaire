const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String
    }
});

const Family = mongoose.model('Family', familySchema);
module.exports = Family;
