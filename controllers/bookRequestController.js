
const { createBookRequestService } = require("../services/bookRequestService");
const { getStudentIdByUserId } = require("../services/studentService");

const createBookRequestController = async (req, res) => {
    const { book_id } = req.body;
    const user_id = req.user.user_id;  
    console.log(req.user);
     
    try {
        const student = await getStudentIdByUserId(user_id);
        const request = await createBookRequestService(student.student_id, book_id);
        res.status(201).json({
            success: true,
            message: "Book request created successfully",
            data: request
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = { createBookRequestController };
