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

// Mettre à jour un article
const updateArticle = async (req, res) => {
    const { id } = req.params;
    const { name, category, subcategory, barcode, description, location, price, status } = req.body;
    try {
        const updatedArticle = await Article.findByIdAndUpdate(
            id,
            { name, category, subcategory, barcode, description, location, price, status },
            { new: true } // Pour retourner l'article mis à jour
        );
        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article non trouvé.' });
        }
        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'article.' });
    }
};

// Supprimer un article
const deleteArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedArticle = await Article.findByIdAndDelete(id);
        if (!deletedArticle) {
            return res.status(404).json({ message: 'Article non trouvé.' });
        }
        res.status(200).json({ message: 'Article supprimé avec succès.' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'article.' });
    }
};

module.exports = {
    getArticles,
    addArticle,
    updateArticle,
    deleteArticle
};
