const express = require('express');
const { scanArticle, getInventory, exportInventory, endZone } = require('../controllers/inventoryController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/scan', protect, scanArticle);
router.get('/', protect, getInventory);
router.get('/export', protect, exportInventory);
router.post('/zone/end', protect, endZone); // Nouvelle route pour terminer une zone

module.exports = router;
