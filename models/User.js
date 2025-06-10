const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs'); // <--- GANTI DI SINI

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER, // int(11) -> INTEGER
    primaryKey: true,
    autoIncrement: true, // AUTO_INCREMENT
  },
  username: {
    type: DataTypes.STRING(255), // varchar(255)
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255), // varchar(255)
    allowNull: false,
  },
  created_at: { // Matches 'created_at' in your schema
    type: DataTypes.DATE, // timestamp
    defaultValue: DataTypes.NOW, // current_timestamp()
    allowNull: false,
  }
}, {
  tableName: 'user', // Ensure Sequelize uses the correct table name
  timestamps: false, // Disable default Sequelize timestamps (createdAt, updatedAt)
  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  },
});

User.prototype.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;