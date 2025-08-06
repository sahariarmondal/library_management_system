const Student = require("./student.js");
const Course = require("./course.js");
const Book = require("./book");
const Author = require("./author");
const BookCopy = require("./book_copy.js");
const StudentCart = require("./student_cart");
const BookAllocation = require("./book_allocation.js");
const Fine = require("./fine.js");
const BookAuthor = require("./book_author.js");
const User = require("./user.js");
const Admin = require("./admin.js");


//Mapping of the Student and Course models M:1
Student.belongsTo(Course, {
  foreignKey: {
    name: 'course_id',
    allowNull: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  },
  as: 'course'
  
});

Course.hasMany(Student, {
  foreignKey: 'course_id',
  as: 'students'
});


// Defining many-to-many relationship between Book and Author
// Book.belongsToMany(Author, { through: "BookAuthors" });
// Author.belongsToMany(Book, { through: "BookAuthors" });

Book.belongsToMany(Author, {
  through: BookAuthor,
  foreignKey: 'book_id',
  otherKey: 'auth_id',
  as: 'authors'
});

Author.belongsToMany(Book, {
  through: BookAuthor,
  foreignKey: 'auth_id',
  otherKey: 'book_id',
  as: 'books'
});

//definig book and book copy relationship 1:M
BookCopy.belongsTo(Book, {
  foreignKey: 'book_id',  
  onDelete: 'CASCADE', //If a book is deleted then corrosponding all book copies will be deleted.
  onUpdate: 'CASCADE',
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
  otherKey: "book_id",
  as: 'books_students'
});

Book.belongsToMany(Student, {
  through: StudentCart,
  foreignKey: "book_id",
  otherKey: "student_id",
  as: 'students_books'
});




//Book Allocation relationships
// Student hasMany BookAllocations
BookAllocation.belongsTo(Student, {
  foreignKey: 'student_id',
  as: 'student_allocation',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
});

Student.hasMany(BookAllocation, {
  foreignKey: 'student_id',
  as: 'allocation_students'
});




// BookCopy hasMany BookAllocation'

BookAllocation.belongsTo(BookCopy, {
  foreignKey: 'copy_id',
  as: 'copy_allocation',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
});

BookCopy.hasMany(BookAllocation, {
  foreignKey: 'copy_id',
  as: 'allocation_copys'
});




// Fines and book allocation and student relationship
Fine.belongsTo(BookAllocation, {
  foreignKey: 'allocation_id',
  as: 'allocation_fine',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
});
BookAllocation.hasOne(Fine, {
  foreignKey: 'allocation_id',
  as: 'fine_allocation'
});

// Fine belongs to Student

Fine.belongsTo(Student, {
  foreignKey: 'student_id',
  as: 'student_fine',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
});

Student.hasMany(Fine, {
  foreignKey: 'student_id',
  as: 'fine_student'
});

User.hasOne(Student, {
  foreignKey: "user_id",
  as: "student_profile"
});
Student.belongsTo(User, {
  foreignKey: "user_id",
  as: "user"
});

User.hasOne(Admin, {
  foreignKey: "user_id",
  as: "admin_profile"
});
Admin.belongsTo(User, {
  foreignKey: "user_id",
  as: "user"
});







module.exports = { Student, Course, Book, Author, BookCopy, StudentCart, BookAllocation, Fine, BookAuthor};
