const bwipjs = require('bwip-js');
const Zone = require('../models/zone');
const Article = require('../models/article');

// Génération du code-barres pour une zone
const generateZoneBarcode = async (req, res) => {
    try {
        const zone = await Zone.findById(req.params.id);
        if (!zone) {
            return res.status(404).json({ message: 'Zone non trouvée' });
        }
        
        bwipjs.toBuffer({
            bcid: 'code128',
            text: zone.barcode,
            scale: 3,
            height: 10,
            includetext: true,
            textxalign: 'center'
        }, (err, png) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur lors de la génération du code-barres' });
            } else {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(png);
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la génération du code-barres pour la zone' });
    }
};

// Génération du code-barres pour un article
const generateArticleBarcode = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article non trouvé' });
        }
        
        bwipjs.toBuffer({
            bcid: 'code128',
            text: article.barcode,
            scale: 3,
            height: 10,
            includetext: true,
            textxalign: 'center'
        }, (err, png) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur lors de la génération du code-barres' });
            } else {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(png);
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la génération du code-barres pour l\'article' });
    }
};

module.exports = {
    generateZoneBarcode,
    generateArticleBarcode
};
