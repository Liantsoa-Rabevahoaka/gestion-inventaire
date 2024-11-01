const express = require('express');
const { getSubFamilies, addSubFamily, updateSubFamily, deleteSubFamily } = require('../controllers/subFamilyController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Routes CRUD pour les sous-familles
router.get('/', protect, getSubFamilies);
router.post('/', protect, addSubFamily);
router.put('/:id', protect, updateSubFamily);
router.delete('/:id', protect, deleteSubFamily);

module.exports = router;
