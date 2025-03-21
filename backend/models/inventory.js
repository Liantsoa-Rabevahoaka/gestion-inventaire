const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    subcategory: { type: String },
    barcode: { type: String, required: true, unique: true },
    description: { type: String },
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone', required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ['bon', 'endommagé', 'en réparation'], default: 'bon' },
    scannedAt: { type: Date, default: Date.now } // Date du scan
});

module.exports = mongoose.model('Inventory', inventorySchema);
