const SubFamily = require('../models/subFamily');

const getSubFamilies = async (req, res) => {
    try {
        const subFamilies = await SubFamily.find().populate('family', 'name');
        res.status(200).json(subFamilies);
    } catch (error) {
        console.error('Erreur lors de la récupération des sous-familles:', error.message);
        res.status(500).json({ message: 'Erreur lors de la récupération des sous-familles' });
    }
};

const addSubFamily = async (req, res) => {
    const { name, family, description } = req.body;
    try {
        const newSubFamily = new SubFamily({ name, family, description });
        await newSubFamily.save();
        res.status(201).json(newSubFamily);
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la sous-famille:', error.message);
        res.status(500).json({ message: 'Erreur lors de l\'ajout de la sous-famille' });
    }
};

const updateSubFamily = async (req, res) => {
    const { id } = req.params;
    const { name, family, description } = req.body;
    try {
        const updatedSubFamily = await SubFamily.findByIdAndUpdate(
            id,
            { name, family, description },
            { new: true }
        ).populate('family', 'name');
        if (!updatedSubFamily) {
            return res.status(404).json({ message: 'Sous-famille non trouvée' });
        }
        res.status(200).json(updatedSubFamily);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la sous-famille:', error.message);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la sous-famille' });
    }
};

const deleteSubFamily = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSubFamily = await SubFamily.findByIdAndDelete(id);
        if (!deletedSubFamily) {
            return res.status(404).json({ message: 'Sous-famille non trouvée' });
        }
        res.status(200).json({ message: 'Sous-famille supprimée avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de la sous-famille:', error.message);
        res.status(500).json({ message: 'Erreur lors de la suppression de la sous-famille' });
    }
};

module.exports = { getSubFamilies, addSubFamily, updateSubFamily, deleteSubFamily };
