const sequelize = require("../config/db_config.js");
const { DataTypes } = require("sequelize"); 

const Author = sequelize.define('Author', {
  auth_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
    email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
     validate: {
      isEmail: true,
    },
  },
}, {
  tableName: 'authors',
  timestamps: true
});

module.exports = Author;
