const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');
const { protect } = require('../middleware/authMiddleware'); // Optional: protect these routes for admin only

// Routes for managing master film data
router.route('/')
 .post(filmController.createFilm) // Create film
 .get(filmController.getAllFilms); // Read all films

// --- PINDAHKAN RUTE PENCARIAN KE ATAS RUTE ID ---
// Endpoint: GET /api/films/search?query=...
router.get('/search', filmController.searchFilms); // <--- PINDAHKAN INI KE ATAS

router.route('/:id')
 .get(filmController.getFilmById) // Read single film by ID
 .put(filmController.updateFilm) // Update film
 .delete(filmController.deleteFilm); // Delete film

module.exports = router;