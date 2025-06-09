const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController'); // You'll need to create this controller

// For now, only get profile. Update/Delete user can be added later.
router.get('/profile', protect, userController.getProfile);
// router.put('/profile', protect, userController.updateProfile); // Update user profile

module.exports = router;