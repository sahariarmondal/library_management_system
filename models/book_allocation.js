const sequelize = require("../config/db_config.js");
const { DataTypes } = require("sequelize");

const BookAllocation = sequelize.define("BookAllocation", {
    allocation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }, 
    copy_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    issue_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    return_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM("issued", "returned", "overdue", "rejected"),
        defaultValue: "issued",
        allowNull: false,
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    is_returned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,   
        allowNull: false,
    }
}, {   
    tableName: "book_allocations",
    timestamps: true,
});

module.exports = BookAllocation;