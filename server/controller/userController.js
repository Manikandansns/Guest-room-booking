// controller/userController.js
const User = require('../models/User');
const Room = require("../models/Room")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.Userregister = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, phone, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.Userlogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15d' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// New method to get user details
exports.getUserDetails = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch the user details, excluding the password
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getRooms = async (req, res) => {
    try {
      const rooms = await Room.find();

      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve rooms', error });
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
  