const sequelize = require("../config/db_config.js");
const { DataTypes } = require("sequelize");

const Admin = sequelize.define("Admin", {
  admin_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phone_no:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: "users",
      key: "user_id"
    },
    onDelete: "CASCADE",
  },

}, {
  tableName: "admins",
  timestamps: true,
});

module.exports = Admin;
