const User = require('../models/User');

exports.getProfile = async (req, res) => {
    // req.user comes from the auth middleware
    if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
    }
    // Return user data excluding password
    res.status(200).json({
        id: req.user.id,
        username: req.user.username,
        created_at: req.user.created_at,
    });
};

// You can add an updateProfile function here if needed
/*
exports.updateProfile = async (req, res) => {
    const { username, password } = req.body; // Example fields to update
    try {
        const user = req.user; // User object from middleware
        if (username) user.username = username;
        if (password) {
            // Password hashing will be handled by model hooks
            user.password = password;
        }
        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', username: user.username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update profile', error: error.message });
    }
};
*/