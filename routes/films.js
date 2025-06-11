const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');
const { protect } = require('../middleware/authMiddleware'); // Optional: protect these routes for admin only

// Routes for managing master film data
// You might want to add an 'isAdmin' middleware here if only admins can CRUD films
router.route('/')
  .post(filmController.createFilm) // Create film
  .get(filmController.getAllFilms); // Read all films

router.route('/:id')
  .get(filmController.getFilmById) // Read single film by ID
  .put(filmController.updateFilm) // Update film
  .delete(filmController.deleteFilm); // Delete film

// --- TAMBAHKAN BARIS INI UNTUK RUTE PENCARIAN ---
// Endpoint: GET /api/films/search?query=...
router.get('/search', filmController.searchFilms); // <--- TAMBAHKAN BARIS INI

module.exports = router;