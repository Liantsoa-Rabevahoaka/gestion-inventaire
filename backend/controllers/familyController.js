const Family = require('../models/family');

const getFamilies = async (req, res) => {
    try {
        const families = await Family.find();
        res.status(200).json(families);
    } catch (error) {
        console.error('Erreur lors de la récupération des familles:', error.message);
        res.status(500).json({ message: 'Erreur lors de la récupération des familles' });
    }
};

const addFamily = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newFamily = new Family({ name, description });
        await newFamily.save();
        res.status(201).json(newFamily);
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la famille:', error.message);
        res.status(500).json({ message: 'Erreur lors de l\'ajout de la famille' });
    }
};

const updateFamily = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updatedFamily = await Family.findByIdAndUpdate(
            id,
            { name, description },
            { new: true }
        );
        if (!updatedFamily) {
            return res.status(404).json({ message: 'Famille non trouvée' });
        }
        res.status(200).json(updatedFamily);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la famille:', error.message);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la famille' });
    }
};

const deleteFamily = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedFamily = await Family.findByIdAndDelete(id);
        if (!deletedFamily) {
            return res.status(404).json({ message: 'Famille non trouvée' });
        }
        res.status(200).json({ message: 'Famille supprimée avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de la famille:', error.message);
        res.status(500).json({ message: 'Erreur lors de la suppression de la famille' });
    }
};

module.exports = { getFamilies, addFamily, updateFamily, deleteFamily };
