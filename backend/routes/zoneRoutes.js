const express = require('express');
const { getZones, addZone, updateZone, deleteZone } = require('../controllers/zoneController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Récupérer toutes les zones
router.get('/', getZones);

// Ajouter une nouvelle zone
router.post('/', protect, addZone);

// Mettre à jour une zone
router.put('/:id', protect, updateZone);

// Supprimer une zone
router.delete('/:id', protect, deleteZone);

module.exports = router;
