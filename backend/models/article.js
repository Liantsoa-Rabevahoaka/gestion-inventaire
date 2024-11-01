const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String
    },
    family: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Family',  // Référence à la famille
        required: true
    },
    subFamily: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubFamily'  // Référence à la sous-famille
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Zone',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['bon', 'endommagé', 'en réparation'],
        default: 'bon'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
