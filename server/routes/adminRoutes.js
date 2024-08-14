// routes/adminRoutes.js
const express = require('express');
const { Adminregister, Adminlogin, getAdminDetails  } = require('../controller/adminController');
const router = express.Router();
const authenticateAdmin = require('../middleware/authMiddleware');

router.post('/register', Adminregister);
router.post('/login', Adminlogin);
router.get('/details', authenticateAdmin, getAdminDetails);

module.exports = router;
