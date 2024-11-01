const express = require('express');
const { getFamilies, addFamily, updateFamily, deleteFamily } = require('../controllers/familyController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Routes CRUD pour les familles
router.get('/', protect, getFamilies);
router.post('/', protect, addFamily);
router.put('/:id', protect, updateFamily);
router.delete('/:id', protect, deleteFamily);

module.exports = router;
