const sequelize = require("../config/db_config.js");
const { DataTypes } = require("sequelize");

const Fine = sequelize.define("Fine", {
  fine_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  allocation_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  student_id: {
  type: DataTypes.INTEGER,
  allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  reason: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  is_paid: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  paid_on: {
    type: DataTypes.DATE,
    allowNull: true
  },
  issued_on: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: "fines",
  timestamps: false
});

module.exports = Fine;
