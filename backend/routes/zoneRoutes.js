const express = require('express');
const { getZones, addZone, updateZone, deleteZone } = require('../controllers/zoneController');
const router = express.Router();

// Récupérer toutes les zones
router.get('/', getZones);

// Ajouter une nouvelle zone
router.post('/', addZone);

// Mettre à jour une zone
router.put('/:id', updateZone);

// Supprimer une zone
router.delete('/:id', deleteZone);

module.exports = router;
