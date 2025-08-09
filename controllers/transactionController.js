const  { issueBookToStudentService }   = require("../services/transactionService");

const issueBookController = async (req, res) => {
  try {
    const { student_id, book_id } = req.body;

    if (!student_id || !book_id) {
      return res.status(400).json({ error: "student_id and book_id are required" });
    }

    const allocation = await issueBookToStudentService(student_id, book_id);

    res.status(201).json({
      message: "Book issued successfully",
      allocation
    });

  } catch (error) {
    console.error("Book issue error:", error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  issueBookController
};
