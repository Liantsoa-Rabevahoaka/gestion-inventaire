const express = require('express');
const { getArticles, addArticle } = require('../controllers/articleController');
const router = express.Router();

// Route pour récupérer tous les articles
router.get('/', getArticles);

// Route pour ajouter un article
router.post('/', addArticle);

module.exports = router;
