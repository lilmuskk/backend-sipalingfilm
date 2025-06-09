require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const sequelize = require('./config/database');
const User = require('./models/User');
const Film = require('./models/Film');
const Watchlist = require('./models/Watchlist');

// Define associations (if not already done in models) - TETAP PENTING!
User.hasMany(Watchlist, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Watchlist.belongsTo(User, { foreignKey: 'user_id' });

Film.hasMany(Watchlist, { foreignKey: 'film_id', onDelete: 'CASCADE' });
Watchlist.belongsTo(Film, { foreignKey: 'film_id' });

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const filmRoutes = require('./routes/films');
const watchlistRoutes = require('./routes/watchlist');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database synchronization (be careful with 'force: true' in production!)
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/films', filmRoutes); // For managing master film data (e.g., by admin)
app.use('/api/watchlist', watchlistRoutes); // For user-specific watchlists

// Basic home route
app.get('/', (req, res) => {
  res.send('Backend API for sipalingfilm is running!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });