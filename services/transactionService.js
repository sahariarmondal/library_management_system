const Student = require("../models/student");
const Book = require("../models/book");
const BookCopy = require("../models/book_copy");
const BookAllocation = require("../models/book_allocation");
const sequelize = require("../config/db_config");




const issueBookToStudentService  = async (student_id, book_id) => {
  const t = await sequelize.transaction(); 
  try {
    // Validate student
    const student = await Student.findOne({
      where: { student_id, status: "Active" },
      transaction: t
    });
    if (!student) throw new Error("Student not found or inactive");

    // Validate book & availability
    const book = await Book.findOne({
      where: { book_id, active: true },
      transaction: t
    });
    if (!book || book.available_copies <= 0) {
      throw new Error("Book not available or out of stock");
    }

    // Find available copy
    const availableCopy = await BookCopy.findOne({
      where: {
        book_id,
        availability_status: "available"
      },
      transaction: t
    });
    if (!availableCopy) throw new Error("No available book copy found");

    // Create allocation
    const issueDate = new Date();
    const dueDate = new Date(issueDate);
    dueDate.setDate(dueDate.getDate() + 14);

    const allocation = await BookAllocation.create({
      student_id,
      book_id,
      copy_id: availableCopy.copy_id,
      issue_date: issueDate,
      due_date: dueDate,
      status: "issued",
      is_returned: false
    }, { transaction: t });

    // Update book & copy
    await Promise.all([
      Book.update(
        { available_copies: book.available_copies - 1 },
        { where: { book_id }, transaction: t }
      ),
      BookCopy.update(
        { availability_status: "issued" },
        { where: { copy_id: availableCopy.copy_id }, transaction: t }
      )
    ]);

   
    await t.commit();
    return allocation;

  } catch (error) {
   
    await t.rollback();
    throw error;
  }
};

module.exports = { issueBookToStudentService }
