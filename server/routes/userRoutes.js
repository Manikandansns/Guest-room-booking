const express = require('express');
const { Userregister, Userlogin, getUserDetails ,getRooms ,getRoomById } = require('../controller/userController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Middleware to protect routes

router.post('/register', Userregister);
router.post('/login', Userlogin);
router.get('/details', authMiddleware, getUserDetails);
router.get('/rooms',getRooms);
router.get('/rooms/:id',getRoomById);

module.exports = router;
