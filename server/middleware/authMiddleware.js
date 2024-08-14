// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const authenticateAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authentication token is missing' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded.id);

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        req.admin = admin;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authenticateAdmin;
