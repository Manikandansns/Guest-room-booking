// models/Room.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomType: { type: String, required: true },
  isAC: { type: Boolean, required: true },
  description: { type: String, required: true },
  location: {
    country: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    address: { type: String, required: true }
  },
  availability: { type: String, required: true },
  pricing: { type: Number, required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
  photos: [{ type: String }],
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true }, // Reference to Admin
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: false } // Reference to Company
});

module.exports = mongoose.model('Room', roomSchema);
