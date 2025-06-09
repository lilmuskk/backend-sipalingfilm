const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlistController');
const { protect } = require('../middleware/authMiddleware'); // Watchlist routes must be protected

// All watchlist operations require authentication
router.route('/')
  .post(protect, watchlistController.addFilmToWatchlist) // Add to watchlist (Create)
  .get(protect, watchlistController.getUserWatchlist); // Get user's watchlist (Read)

router.route('/:id') // :id here refers to the watchlist entry ID
  .delete(protect, watchlistController.removeFilmFromWatchlist); // Remove from watchlist (Delete)

// You could add a PUT route for watchlist if you have fields to update on it
// .put(protect, watchlistController.updateWatchlistEntry); // Update watchlist entry (e.g., mark as watched)

module.exports = router;     