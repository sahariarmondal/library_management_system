// services/bookRequestService.js
const { Op } = require("sequelize");
const sequelize = require("../config/db_config");
const Student = require("../models/student");
const Fine = require("../models/fine");
const BookRequest = require("../models/book_request");
const Book = require("../models/book");

const createBookRequestService = async (student_id, book_id) => {
  const t = await sequelize.transaction();

  try {
    if (!book_id) {
      throw new Error("Book ID is required");
    }

    // 1. Check if book exists and has available quantity > 0
    const book = await Book.findOne({ where: { book_id }, transaction: t });
    if (!book) {
      throw new Error("Book not found");
    }
    if (book.available_quantity <= 0) {
      throw new Error("Book is not available currently");
    }

    // 2. Validate Student Status
    const student = await Student.findByPk(student_id, { transaction: t });
    if (!student) throw new Error("Student not found or inactive");

    // 3. Check request quota
    if (student.available_request_count <= 0) {
      throw new Error("Request limit reached");
    }

    // 4. Check overdue books
    const overdueCount = await BookRequest.count({
      where: {
        student_id,
        status: "overdue",
      },
      transaction: t,
    });
    if (overdueCount > 0) throw new Error("Student has overdue books");

    // 5. Check unpaid fines
    const unpaidFineCount = await Fine.count({
      where: { student_id, is_paid: false },
      transaction: t,
    });
    if (unpaidFineCount > 0) throw new Error("Student has unpaid fines");

    // 6. Prevent duplicate request for same book
    const duplicateRequest = await BookRequest.findOne({
      where: {
        student_id,
        book_id,
      },
      transaction: t,
    });
    if (duplicateRequest) throw new Error("Book already requested or issued");

    // 7. Create book request
    const bookRequest = await BookRequest.create(
      {
        student_id,
        book_id,
        status: "pending",
      },
      { transaction: t }
    );

    // 8. Decrease student available request count
    // Using instance method (student is a model instance)
    await student.update(
      { available_request_count: student.available_request_count - 1 },
      { transaction: t }
    );

    await t.commit();
    return bookRequest;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

module.exports = { createBookRequestService };
