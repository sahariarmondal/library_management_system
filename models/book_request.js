// models/book_request.js
const sequelize = require("../config/db_config.js");
const { DataTypes } = require("sequelize");

// const BookRequest = sequelize.define("BookRequest", {
//     student_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//     },
//     book_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey:true,
//     },
//     copy_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true, // null until assigned by admin
//     },
//     status: {
//         type: DataTypes.ENUM("pending", "issued", "overdue"),
//         allowNull: false,
//         defaultValue: "pending",
//     },
//     issue_date: {
//         type: DataTypes.DATE,
//         allowNull: true,
//     },
//     due_date: {
//         type: DataTypes.DATE,
//         allowNull: true,
//     }
// }, {
//     tableName: "book_requests",
//     timestamps: true,
// });

// module.exports = BookRequest;


// models/book_request.js

const BookRequest = sequelize.define("BookRequest", {
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    copy_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // assigned only when admin approves
    },
    status: {
        type: DataTypes.ENUM("pending", "issued", "overdue"),
        allowNull: false,
        defaultValue: "pending",
    },
    issue_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    request_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "book_requests",
    timestamps: true,
});

module.exports = BookRequest;
