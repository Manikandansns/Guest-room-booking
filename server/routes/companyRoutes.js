// routes/companyRoutes.js
const express = require('express');
const router = express.Router();
const { createCompany } = require('../controller/companyController');
const authenticateAdmin = require('../middleware/authMiddleware');

// Route to create a company
router.post('/',authenticateAdmin, createCompany);

module.exports = router;
