const express = require('express');
const { getArticles, addArticle, updateArticle, deleteArticle } = require('../controllers/articleController');
const { protect } = require('../middleware/authMiddleware');
const { checkZoneScan } = require('../middleware/zoneScanMiddleware');
const router = express.Router();

// Routes CRUD pour les articles (nécessite que la zone soit scannée)
router.get('/', protect, checkZoneScan, getArticles);
router.post('/', protect, checkZoneScan, addArticle);
router.put('/:id', protect, checkZoneScan, updateArticle);
router.delete('/:id', protect, checkZoneScan, deleteArticle);

module.exports = router;
