const Film = require('../models/Film');
const { Op } = require('sequelize'); // <--- PASTIKAN INI ADA untuk Sequelize.Op.or

// Create Film (Admin/Manual entry)
exports.createFilm = async (req, res) => {
    const { title, genre, description, imageUrl, year } = req.body;
    try {
        const film = await Film.create({ title, genre, description, imageUrl, year });
        res.status(201).json(film);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add film', error: error.message });
    }
};

// Get All Films (Browse films)
exports.getAllFilms = async (req, res) => {
    try {
        const films = await Film.findAll();
        res.status(200).json(films);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve films', error: error.message });
    }
};

// Get Film by ID
exports.getFilmById = async (req, res) => {
    const { id } = req.params;
    try {
        const film = await Film.findByPk(id);
        if (!film) {
            return res.status(404).json({ message: 'Film not found' });
        }
        res.status(200).json(film);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve film', error: error.message });
    }
};

// Update Film (Admin/Manual entry)
exports.updateFilm = async (req, res) => {
    const { id } = req.params;
    const { title, genre, description, imageUrl, year } = req.body;
    try {
        const film = await Film.findByPk(id);
        if (!film) {
            return res.status(404).json({ message: 'Film not found' });
        }

        film.title = title || film.title;
        film.genre = genre || film.genre;
        film.description = description || film.description;
        film.imageUrl = imageUrl || film.imageUrl;
        film.year = year || film.year;

        await film.save();
        res.status(200).json({ message: 'Film updated successfully', film });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update film', error: error.message });
    }
};

// Delete Film (Admin/Manual entry)
exports.deleteFilm = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCount = await Film.destroy({ where: { id } });
        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Film not found' });
        }
        res.status(200).json({ message: 'Film deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete film', error: error.message });
    }
};

// --- TAMBAHKAN FUNGSI searchFilms INI ---
exports.searchFilms = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        // Jika query kosong, kembalikan semua film (sesuai spesifikasi)
        const films = await Film.findAll();
        return res.status(200).json(films);
    }

    try {
        const films = await Film.findAll({
            where: {
                [Op.or]: [ // Menggunakan Op dari destructuring di atas
                    { title: { [Op.like]: `%${query}%` } },
                    { genre: { [Op.like]: `%${query}%` } }
                ]
            }
        });
        // Mengembalikan array film (bisa kosong jika tidak ada yang ditemukan)
        res.status(200).json(films);
    } catch (error) {
        console.error('Search films error:', error);
        res.status(500).json({ message: 'Failed to search films', error: error.message });
    }
};