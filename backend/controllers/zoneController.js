const Zone = require('../models/zone');

// Récupérer toutes les zones
const getZones = async (req, res) => {
    try {
        const zones = await Zone.find();
        res.status(200).json(zones);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des zones.' });
    }
};

// Ajouter une nouvelle zone
const addZone = async (req, res) => {
    const { name, barcode, description, location } = req.body;
    try {
        const newZone = new Zone({ name, barcode, description, location });
        await newZone.save();
        res.status(201).json(newZone);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout de la zone.' });
    }
};

// Mettre à jour une zone
const updateZone = async (req, res) => {
    const { id } = req.params;
    const { name, barcode, description, location } = req.body;
    try {
        const updatedZone = await Zone.findByIdAndUpdate(
            id,
            { name, barcode, description, location },
            { new: true }
        );
        if (!updatedZone) {
            return res.status(404).json({ message: 'Zone non trouvée.' });
        }
        res.status(200).json(updatedZone);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la zone.' });
    }
};

// Supprimer une zone
const deleteZone = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedZone = await Zone.findByIdAndDelete(id);
        if (!deletedZone) {
            return res.status(404).json({ message: 'Zone non trouvée.' });
        }
        res.status(200).json({ message: 'Zone supprimée avec succès.' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la zone.' });
    }
};

module.exports = {
    getZones,
    addZone,
    updateZone,
    deleteZone
};
