const sequelize = require("../config/db_config.js");
const { DataTypes } = require("sequelize");

// const BookAllocation = sequelize.define("BookAllocation", {
//     allocation_id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     book_id:{
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     copy_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     student_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     issue_date: {
//         type: DataTypes.DATE,
//         allowNull: true,
//     },
//     return_date: {
//         type: DataTypes.DATE,
//         allowNull: true,
//     },
//     status: {
//         type: DataTypes.ENUM("issued", "returned", "overdue"),
//         defaultValue: "issued",
//         allowNull: false,
//     },
//     due_date: {
//         type: DataTypes.DATE,
//         allowNull: true,
//     }
// }, {   
//     tableName: "book_allocations",
//     timestamps: true,
// });

// module.exports = BookAllocation;

// models/book_allocation.js
// const sequelize = require("../config/db_config.js");
// const { DataTypes } = require("sequelize");

const BookAllocation = sequelize.define("BookAllocation", {
    allocation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        type: DataTypes.ENUM("issued", "returned", "overdue"),
        defaultValue: "issued",
        allowNull: false,
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    allocated_by: { // Admin ID
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "book_allocations",
    timestamps: true,
});

module.exports = BookAllocation;
