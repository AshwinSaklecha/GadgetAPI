const express = require('express');
const router = express.Router();
const { getAllGadgets, createGadget, updateGadget, deleteGadget, selfDestructGadget } = require('../controllers/gadgetController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', getAllGadgets);

router.post('/', verifyToken, createGadget);
router.patch('/:id', verifyToken, updateGadget);
router.delete('/:id', verifyToken, deleteGadget);
router.post('/:id/self-destruct', verifyToken, selfDestructGadget);

module.exports = router;