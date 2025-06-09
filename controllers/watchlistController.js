const Watchlist = require('../models/Watchlist');
const Film = require('../models/Film'); // To include film details

// Add Film to Watchlist (Create)
exports.addFilmToWatchlist = async (req, res) => {
  const { film_id } = req.body;
  const user_id = req.user.id; // From authenticated user

  try {
    // Optional: Check if film_id exists in 'film' table
    const filmExists = await Film.findByPk(film_id);
    if (!filmExists) {
        return res.status(404).json({ message: 'Film not found in master list' });
    }

    // Optional: Prevent duplicate entries for the same user and film
    const existingEntry = await Watchlist.findOne({
      where: { user_id, film_id }
    });
    if (existingEntry) {
      return res.status(400).json({ message: 'Film already in watchlist' });
    }

    const watchlistEntry = await Watchlist.create({ user_id, film_id });
    res.status(201).json(watchlistEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add film to watchlist', error: error.message });
  }
};

// Get User's Watchlist (Read)
exports.getUserWatchlist = async (req, res) => {
  const user_id = req.user.id; // From authenticated user

  try {
    const watchlist = await Watchlist.findAll({
      where: { user_id },
      include: [{ // Include film details
        model: Film,
        attributes: ['id', 'title', 'genre', 'description', 'imageUrl', 'year']
      }],
      order: [['added_at', 'DESC']]
    });
    res.status(200).json(watchlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve watchlist', error: error.message });
  }
};

// Remove Film from Watchlist (Delete)
exports.removeFilmFromWatchlist = async (req, res) => {
  const { id } = req.params; // Watchlist entry ID
  const user_id = req.user.id; // From authenticated user

  try {
    const deletedCount = await Watchlist.destroy({
      where: { id, user_id } // Ensure only owner can delete
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Watchlist entry not found or not authorized' });
    }
    res.status(200).json({ message: 'Film removed from watchlist successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to remove film from watchlist', error: error.message });
  }
};

// (Update operation for watchlist might be less common, as it's usually add/remove.
// But if you want to update 'added_at' or add a 'status' field, you can create one.)
/*
exports.updateWatchlistEntry = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;
    const { new_film_id, new_added_at } = req.body; // Example fields to update

    try {
        const entry = await Watchlist.findOne({ where: { id, user_id } });
        if (!entry) {
            return res.status(404).json({ message: 'Watchlist entry not found or not authorized' });
        }
        entry.film_id = new_film_id || entry.film_id;
        entry.added_at = new_added_at || entry.added_at;
        await entry.save();
        res.status(200).json({ message: 'Watchlist entry updated successfully', entry });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update watchlist entry', error: error.message });
    }
};
*/