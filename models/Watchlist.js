const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Imported in app.js for associations
const Film = require('./Film'); // Imported in app.js for associations

const Watchlist = sequelize.define('Watchlist', {
  id: {
    type: DataTypes.INTEGER, // int(11)
    primaryKey: true,
    autoIncrement: true, // AUTO_INCREMENT
  },
  user_id: { // Foreign key for User
    type: DataTypes.INTEGER, // int(11)
    allowNull: true, // Based on your schema
    references: {
      model: 'user', // Name of the target table
      key: 'id',
    }
  },
  film_id: { // Foreign key for Film
    type: DataTypes.INTEGER, // int(11)
    allowNull: true, // Based on your schema
    references: {
      model: 'film', // Name of the target table
      key: 'id',
    }
  },
  added_at: { // Matches 'added_at' in your schema
    type: DataTypes.DATE, // timestamp
    defaultValue: DataTypes.NOW, // current_timestamp()
    allowNull: false,
  }
}, {
  tableName: 'watchlist', // Ensure Sequelize uses the correct table name
  timestamps: false, // Disable default Sequelize timestamps
});

module.exports = Watchlist;