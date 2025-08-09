// const  { issueBookToStudentService }   = require("../services/transactionService");

// const issueBookController = async (req, res) => {
//   try {
//     const { student_id, book_id } = req.body;

//     if (!student_id || !book_id) {
//       return res.status(400).json({ error: "student_id and book_id are required" });
//     }

//     const allocation = await issueBookToStudentService(student_id, book_id);

//     res.status(201).json({
//       message: "Book issued successfully",
//       allocation
//     });

//   } catch (error) {
//     console.error("Book issue error:", error.message);
//     res.status(400).json({ error: error.message });
//   }
// };

// module.exports = {
//   issueBookController
// };


// controllers/bookAllocationController.js


const { issueBookService } = require("../services/transactionService");
const { getStudentIdByUserId } = require("../services/studentService");
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

module.exports = { issueBookController };
