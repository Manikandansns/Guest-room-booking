// controller/companyController.js
const Company = require('../models/Company');
const Admin = require('../models/Admin');

exports.createCompany = async (req, res) => {
    try {
        // Validate the request body and adminId
        const { companyName, noOfRooms, location } = req.body;

        if (!companyName || !noOfRooms || !location) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (!req.admin || !req.admin._id) {
            return res.status(400).json({ message: 'Admin ID is missing or invalid' });
        }

        const adminId = req.admin._id;

        // Create a new company and save it to the database
        const newCompany = new Company({ companyName, noOfRooms, location, adminId });
        await newCompany.save();

        // Update the admin with the company ID
        await Admin.findByIdAndUpdate(adminId, { companyId: newCompany._id });

        res.status(201).json({ message: 'Company created successfully', company: newCompany });
    } catch (error) {
        console.error("Error creating company:", error);
        res.status(500).json({ message: 'Server error', error });
    }
};
