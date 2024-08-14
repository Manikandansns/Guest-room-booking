const mongoose = require('mongoose');
const Admin = require('../models/Admin')
const companySchema = new mongoose.Schema({
    companyName: String,
    noOfRooms: Number,
    location: {
        country: String,
        state: String,
        district: String,
        address: String,
    },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
});

module.exports = mongoose.model('Company', companySchema);
