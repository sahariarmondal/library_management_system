const sequelize = require("../config/db_config.js");
const { DataTypes } = require("sequelize");

const Course = sequelize.define("Course", {
  course_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  course_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  course_code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  types: {
    type: DataTypes.ENUM('Full-time', 'Part-time', 'Online'),
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: "courses",
});

module.exports = Course;
