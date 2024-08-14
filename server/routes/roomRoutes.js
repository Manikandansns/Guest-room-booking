// routes/roomRoutes.js
const express = require('express');
const { createRoom, getRooms, getRoomById, updateRoom, deleteRoom, createImage, getRoomsByAdmin } = require('../controller/roomController');
const router = express.Router();
const authenticateAdmin = require('../middleware/authMiddleware');

router.post('/', authenticateAdmin, createRoom);
router.get('/', authenticateAdmin,getRooms);
router.get('/:id',authenticateAdmin, getRoomById);
router.put('/:id',authenticateAdmin, updateRoom);
router.delete('/:id',authenticateAdmin, deleteRoom);
// router.get('/', authenticateAdmin, getRoomsByAdmin);

// Serve images
// router.get('/images/:id', createImage);

router.get('/images/:filename', (req, res) => {
    const filepath = path.join(__dirname, '../uploads', req.params.filename);
    res.sendFile(filepath);
  });

  
  

module.exports = router;
