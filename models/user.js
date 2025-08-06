const sequelize = require("../config/db_config");
const { DataTypes } = require("sequelize");

//This is created for authentication purpose
const User = sequelize.define("User", {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("student", "admin"),
    allowNull: false,
  }
}, {
  tableName: "users",
  timestamps: true,
});

module.exports = User;