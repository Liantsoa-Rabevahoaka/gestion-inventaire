const express = require('express');
const { getArticles, addArticle, updateArticle, deleteArticle } = require('../controllers/articleController');
const router = express.Router();

// Récupérer tous les articles
router.get('/', getArticles);

// Ajouter un nouvel article
router.post('/', addArticle);

// Mettre à jour un article
router.put('/:id', updateArticle);

// Supprimer un article
router.delete('/:id', deleteArticle);

module.exports = router;
