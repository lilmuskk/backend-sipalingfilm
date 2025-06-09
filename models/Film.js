const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Film = sequelize.define('Film', {
  id: {
    type: DataTypes.INTEGER, // int(11)
    primaryKey: true,
    autoIncrement: true, // AUTO_INCREMENT
  },
  title: {
    type: DataTypes.STRING(255), // varchar(255)
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING(100), // varchar(100)
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT, // text
    allowNull: true,
  },
  imageUrl: { // Matches 'imageUrl' in your schema
    type: DataTypes.STRING(255), // varchar(255)
    allowNull: true,
  },
  year: {
    type: DataTypes.INTEGER, // int(11)
    allowNull: false,
  }
}, {
  tableName: 'film', // Ensure Sequelize uses the correct table name
  timestamps: false, // Disable default Sequelize timestamps
});

module.exports = Film;