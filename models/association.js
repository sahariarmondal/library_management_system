const Student = require("./student.js");
const Course = require("./course.js");
const Book = require("./book");
const Author = require("./author");
const BookCopy = require("./book_copy.js");
const StudentCart = require("./student_cart");
const BookAllocation = require("./book_allocation.js");
const Fine = require("./fine.js");


//Mapping of the Student and Course models M:1
Student.belongsTo(Course, {
  foreignKey: 'course_id',
  as: 'course'
});

Course.hasMany(Student, {
  foreignKey: 'course_id',
  as: 'students'
});


// Defining many-to-many relationship between Book and Author
Book.belongsToMany(Author, { through: "BookAuthors" });
Author.belongsToMany(Book, { through: "BookAuthors" });

//definig book and book copy relationship 1:M
BookCopy.belongsTo(Book, {
  foreignKey: 'book_id',  
  as: 'book'
});

Book.hasMany(BookCopy, { 
  foreignKey: 'book_id',
  as: 'copies'
});



// Many-to-Many: Students Books through StudentCart
Student.belongsToMany(Book, {
  through: StudentCart,
  foreignKey: "student_id",
  otherKey: "book_id"
});

Book.belongsToMany(Student, {
  through: StudentCart,
  foreignKey: "book_id",
  otherKey: "student_id"
});




//Book Allocation relationships

// Student hasMany BookAllocations
Student.hasMany(BookAllocation, {
  foreignKey: 'student_id',
  as: 'allocations'
});


BookAllocation.belongsTo(Student, {
  foreignKey: 'student_id',
  as: 'student'
});

// BookCopy hasMany BookAllocation
BookCopy.hasMany(BookAllocation, {
  foreignKey: 'copy_id',
  as: 'allocations'
});

BookAllocation.belongsTo(BookCopy, {
  foreignKey: 'copy_id',
  as: 'bookCopy'
});


// Fines and book allocation and student relationship
Fine.belongsTo(BookAllocation, {
  foreignKey: 'allocation_id',
  as: 'allocation'
});
BookAllocation.hasOne(Fine, {
  foreignKey: 'allocation_id',
  as: 'fine'
});

// Fine belongs to Student

Fine.belongsTo(Student, {
  foreignKey: 'student_id',
  as: 'student'
});

Student.hasMany(Fine, {
  foreignKey: 'student_id',
  as: 'fines'
});






module.exports = { Student, Course, Book, Author, BookCopy, StudentCart, BookAllocation, Fine};
