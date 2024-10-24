const express = require('express');
const { getArticles, addArticle, updateArticle, deleteArticle } = require('../controllers/articleController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Récupérer tous les articles
router.get('/', getArticles);

// Ajouter un nouvel article
router.post('/', protect, addArticle);

// Mettre à jour un article
router.put('/:id', protect, updateArticle);

// Supprimer un article
router.delete('/:id', protect, deleteArticle);

module.exports = router;
