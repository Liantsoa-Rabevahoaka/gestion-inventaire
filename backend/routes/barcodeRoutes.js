const express = require('express');
const { generateZoneBarcode, generateArticleBarcode } = require('../controllers/barcodeController');
const router = express.Router();

// Route pour obtenir le code-barres d'une zone
router.get('/zone/:id', generateZoneBarcode);

// Route pour obtenir le code-barres d'un article
router.get('/article/:id', generateArticleBarcode);

module.exports = router;
