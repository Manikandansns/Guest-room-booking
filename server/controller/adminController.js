// controller/adminController.js
const Admin = require('../models/Admin');
const Company = require('../models/Company');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.Adminregister = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const existingAdmin = await Admin.findOne({ email });
        // console.log(existingAdmin)
        if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({ name, email, phone, password: hashedPassword });
        // console.log(admin)
        await admin.save();

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'Admin registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.Adminlogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ message: 'Admin not found' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAdminDetails = async (req, res) => {
    try {
        const adminId = req.admin._id;

        // Fetch the admin details
        const admin = await Admin.findById(adminId).select('-password'); // Exclude the password
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Fetch the company details associated with the admin
        const company = await Company.findOne({ adminId });

        res.status(200).json({ admin, company, adminId, companyId: company?._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
