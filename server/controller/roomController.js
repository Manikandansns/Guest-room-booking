const multer = require('multer');
const path = require('path');
const Room = require('../models/Room');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb(new Error('Only JPEG, JPG, and PNG files are allowed!'));
  }
}).array('photos', 5); // Limit to 5 photos

// controllers/roomController.js

exports.createRoom = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });

    try {

      // Parse location if it's a JSON string
      let location = req.body.location;
      if (typeof location === 'string') {
        location = JSON.parse(location);
      }

      // Extract fields from the request body
      const { roomType, isAC, description, availability, pricing, rating, review, adminId, companyId } = req.body;

      // Ensure isAC is a boolean
      const isACBoolean = isAC === 'true' || isAC === true; // Convert to boolean

      // Extract and process photos
      const photos = req.files ? req.files.map(file => file.path) : [];

      // Create a new room instance
      const newRoom = new Room({
        photos,
        roomType,
        isAC: isACBoolean, // Use boolean value
        description,
        location, // Use the parsed location object
        availability,
        pricing: Number(pricing), // Ensure pricing is numeric
        rating: Number(rating), // Ensure rating is numeric
        review,
        adminId, // Ensure admin ID is passed
        companyId // Save the company ID
      });

      // Save the room to the database
      await newRoom.save();
      res.status(201).json({ message: 'Room created successfully', room: newRoom });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  });
};


// Update a room
exports.updateRoom = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });

    try {
      let location = req.body.location;
      if (typeof location === 'string') {
        location = JSON.parse(location);
      }

      const { roomType, isAC, description, availability, pricing, rating, review } = req.body;

      const updatedData = {
        roomType,
        isAC,
        description,
        location,
        availability,
        pricing,
        rating,
        review
      };

      if (req.files && req.files.length > 0) {
        // Map files to their paths
        updatedData.photos = req.files.map(file => file.path);
      }

      const updatedRoom = await Room.findByIdAndUpdate(req.params.id, updatedData, { new: true });
      if (!updatedRoom) return res.status(404).json({ message: 'Room not found' });
      res.status(200).json({ message: 'Room updated successfully', room: updatedRoom });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
};


// Fetch all rooms
exports.getRooms = async (req, res) => {
  try {
    const { adminId, userId } = req.query;
    // console.log('User ID:', userId);

    // Assuming you want to find rooms based on adminId and companyId
    const rooms = await Room.find({adminId});
    
   

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



// Fetch a specific room by ID
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a room
exports.deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) return res.status(404).json({ message: 'Room not found' });
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



// controllers/roomController.js

exports.getRoomsByAdmin = async (req, res) => {
  try {
    const adminId = req.admin._id;  // Assuming req.admin is set by your authentication middleware
    const rooms = await Room.find({ adminId }); // Filter rooms by adminId
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rooms', error });
  }
};

