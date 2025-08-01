const sequelize = require("../config/db_config.js");
const { DataTypes } = require("sequelize");

const StudentCart = sequelize.define("StudentCart", {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  book_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  }
}, {
  tableName: "student_cart",
  timestamps: false,
});

module.exports = StudentCart;


