const Article = require('../models/article');

// Récupérer tous les articles
const getArticles = async (req, res) => {
    try {
        const articles = await Article.find().populate('location');
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des articles.' });
    }
};

// Ajouter un article
const addArticle = async (req, res) => {
    const { name, category, subcategory, barcode, description, location, price, status } = req.body;
    try {
        const newArticle = new Article({ name, category, subcategory, barcode, description, location, price, status });
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'article.' });
    }
};

module.exports = {
    getArticles,
    addArticle
};
