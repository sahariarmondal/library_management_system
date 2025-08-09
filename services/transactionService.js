const Student = require("../models/student");
const Book = require("../models/book");
const BookCopy = require("../models/book_copy");
const BookAllocation = require("../models/book_allocation");
const BookRequest = require("../models/book_request");
const Fine = require("../models/fine");
const sequelize = require("../config/db_config");
const { Op } = require("sequelize");

const ISSUE_REVALIDATE_HOURS = 24; // threshold for re-check

const issueBookService = async (student_id, book_id, admin_id) => {
  const t = await sequelize.transaction();

  try {
    // 1 Check pending book request
    const request = await BookRequest.findOne({
      where: { student_id, book_id, status: "pending" },
      transaction: t,
    });
    if (!request) {
      throw new Error(
        "No pending book request found for this student and book"
      );
    }

    // 2 Validate student is active
    const student = await Student.findByPk(student_id, { transaction: t });
    if (!student || student.status !== "Active") {
      throw new Error("Student not found or inactive");
    }

    // 3 Optional re-check if request is older than threshold
    const hoursSinceRequest =
      (Date.now() - new Date(request.createdAt).getTime()) / (1000 * 60 * 60);

    if (hoursSinceRequest > ISSUE_REVALIDATE_HOURS) {
      // Check overdue allocations
      const overdueCount = await BookAllocation.count({
        where: { student_id, status: "overdue" },
        transaction: t,
      });
      if (overdueCount > 0) {
        throw new Error("Student has overdue books");
      }

      // Check unpaid fines (no timestamps in Fine, so we just check all unpaid)
      const unpaidFineCount = await Fine.count({
        where: { student_id, is_paid: false },
        transaction: t,
      });
      if (unpaidFineCount > 0) {
        throw new Error("Student has unpaid fines");
      }
    }

    // 4 Check if book exists & available quantity > 0
    const book = await Book.findOne({
      where: { book_id },
      transaction: t,
    });
    if (!book) throw new Error("Book not found");
    if(!book.active) throw new Error("Book is not Active");
    if (book.available_copies <= 0) {
      throw new Error("Book is currently not available");
    }

    // 5 Find an available copy
    const bookCopy = await BookCopy.findOne({
      where: { book_id, availability_status: "available" },
      transaction: t,
    });
    if (!bookCopy) {
      throw new Error("No available book copy found");
    }

    // 6 Create allocation
    const allocation = await BookAllocation.create(
      {
        book_id,
        copy_id: bookCopy.copy_id,
        student_id,
        issue_date: new Date(),
        due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // +14 days
        status: "issued",
        allocated_by: admin_id,
      },
      { transaction: t }
    );

    // 7 Update request
    await request.update(
      {
        status: "issued",
        copy_id: bookCopy.copy_id,
        issue_date: allocation.issue_date,
        due_date: allocation.due_date,
      },
      { transaction: t }
    );

    // 8 Update copy status
    await bookCopy.update(
      { availability_status: "issued" },
      { transaction: t }
    );

    // 9 Decrement book available_quantity
    await book.update(
      { available_copies: book.available_copies - 1 },
      { transaction: t }
    );

    await t.commit();
    return allocation;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

module.exports = { issueBookService };
