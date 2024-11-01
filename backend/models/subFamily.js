const mongoose = require('mongoose');

const subFamilySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    family: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Family',  
        required: true
    },
    description: {
        type: String
    }
});

const SubFamily = mongoose.model('SubFamily', subFamilySchema);
module.exports = SubFamily;
