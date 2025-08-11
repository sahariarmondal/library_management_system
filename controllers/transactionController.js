

const { issueBookService, returnBookService} = require("../services/transactionService");
const { getAdminIdByUserId } = require("../services/adminService");

const issueBookController = async (req, res) => {
  const { student_id, book_id } = req.body;

   
  try {
    if (!student_id || !book_id) {
      return res.status(400).json({
        success: false,
        message: "student_id and book_id are required",
      });
    }

    const admin_id = await getAdminIdByUserId(req.user.user_id);

    const allocation = await issueBookService(student_id, book_id, admin_id);

    res.status(201).json({
      success: true,
      message: "Book issued successfully",
      data: allocation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


const returnBookController = async (req, res) => {
  const { allocation_id, student_id } = req.body;

  try {
    if (!allocation_id || !student_id) {
      return res.status(400).json({
        success: false,
        message: "allocation_id and student_id are required",
      });
    }

    const updatedAllocation = await returnBookService(student_id, allocation_id);

    res.status(200).json({
      success: true,
      message: "Book returned successfully",
      data: updatedAllocation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};



module.exports = { issueBookController, returnBookController };
