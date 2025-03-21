const Inventory = require('../models/inventory');
const Article = require('../models/article');
const Zone = require('../models/Zone');
const XLSX = require('xlsx');

// 📌 Ajouter un article scanné au registre d'inventaire
exports.scanArticle = async (req, res) => {
    try {
        const { articleId, zoneId } = req.body;

        const article = await Article.findById(articleId);
        const zone = await Zone.findById(zoneId);

        if (!article || !zone) {
            return res.status(404).json({ message: 'Article ou Zone introuvable' });
        }

        // Ajouter l'article dans l'inventaire
        const newEntry = new Inventory({
            name: article.name,
            category: article.category,
            subcategory: article.subcategory,
            barcode: article.barcode,
            description: article.description,
            location: zoneId, // Zone scannée
            price: article.price,
            status: article.status
        });

        await newEntry.save();

        res.status(201).json({ message: 'Article ajouté à l’inventaire', data: newEntry });

    } catch (error) {
        console.error('Erreur lors du scan:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// 📌 Récupérer la liste des articles scannés
exports.getInventory = async (req, res) => {
    try {
        const inventoryList = await Inventory.find().populate('location', 'name');
        res.status(200).json(inventoryList);
    } catch (error) {
        console.error('Erreur lors de la récupération de l’inventaire:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// 📌 Fonctionnalité "Zone Terminée"
exports.endZone = async (req, res) => {
    try {
        const { zoneId } = req.body;

        const zone = await Zone.findById(zoneId);
        if (!zone) {
            return res.status(404).json({ message: 'Zone introuvable' });
        }

        res.status(200).json({ message: `Zone ${zone.name} terminée avec succès.` });
    } catch (error) {
        console.error('Erreur lors de la validation de la zone:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// 📌 Exporter l'inventaire en fichier Excel
exports.exportInventory = async (req, res) => {
    try {
        const inventoryList = await Inventory.find().populate('location', 'name');

        const data = inventoryList.map(item => ({
            'Article': item.name,
            'Catégorie': item.category,
            'Sous-Catégorie': item.subcategory,
            'Code-Barres': item.barcode,
            'Description': item.description,
            'Zone': item.location.name,
            'Prix': item.price,
            'État': item.status,
            'Date de Scan': new Date(item.scannedAt).toLocaleString()
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventaire');

        const filePath = './exports/inventaire.xlsx';
        XLSX.writeFile(workbook, filePath);

        res.download(filePath);

    } catch (error) {
        console.error('Erreur lors de l’exportation de l’inventaire:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
