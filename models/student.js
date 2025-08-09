const sequelize = require("../config/db_config.js");
const { DataTypes } = require("sequelize");

const Student = sequelize.define("Student", {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
    unique: true
  },
  phone_no: {
    type: DataTypes.STRING,
    allowNull: true,
    unique : true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date_of_admission: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
   gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
    allowNull: false,
  },
   status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    allowNull: false,
  },
  available_request_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5
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
  timestamps: true,
  tableName: "students",
});

module.exports = Student;
