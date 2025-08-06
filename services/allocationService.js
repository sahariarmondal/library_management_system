// const {Book, Allocation, Student, BookCopy} = require('../models');
const Book = require("../models/book");
const Student = require("../models/student");
const BookCopy = require("../models/book_copy");
const BookAllocation = require("../models/book_allocation");
const sequelize = require("../config/db_config");

const allocateBook = async (bookId, studentId) => {
  const t = await sequelize.transaction();
  try {
    const student = await Student.findByPk(studentId, { transaction: t });
    if (!student) {
      throw new Error("Student not Found");
    }

    const availableBookCopy = await BookCopy.findOne({
      where: {
        book_id: bookId,
        availability_status: "available",
      },
      transaction: t,
    });

    if (!availableBookCopy) {
      throw new Error("No availabe book found for this bookId");
    }

    const issueDate = new Date();
    const dueDate = new Date(issueDate);
    dueDate.setDate(dueDate.getDate() + 15);

    const allocation = await BookAllocation.create(
      {
        copy_id: availableBookCopy.copy_id,
        student_id: studentId,
        issue_date: issueDate,
        due_date: dueDate,
        status: "issued",
        is_returned: false,
      },
      { transaction: t }
    );

    await availableBookCopy.update(
      {
        availability_status: "issued",
      },
      { transaction: t }
    );

    await t.commit();
    return {
      success: true,
      message: "Book allocated successfully",
      data: allocation,
    };
  } catch (err) {
    await t.rollback();
    throw err;
  }
};
