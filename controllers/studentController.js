

// const studentService = require("../services/studentService");

// const createStudentController = async (req, res) => {
//   try {
//     const {
//       first_name,
//       last_name,
//       email,
//       phone_no,
//       address,
//       date_of_admission,
//       course_id,
//       gender,
//       status,
//       user_id,
//     } = req.body;

    
//     if (
//       !first_name || !last_name || !email || !date_of_admission ||
//       !course_id || !gender || !status || !user_id
//     ) {
//       return res.status(400).json({ message: "Required fields are missing" });
//     }

//     const studentData = {
//       first_name,
//       last_name,
//       email,
//       phone_no,
//       address,
//       date_of_admission,
//       course_id,
//       gender,
//       status,
//       user_id,
//     };

//     const newStudent = await studentService.createStudent(studentData);
//     res.status(201).json({ message: "Student created successfully", data: newStudent });
//   } catch (error) {
//     console.error("Error creating student:", error);

//     // Handle Sequelize validation errors
//     if (error.name === "SequelizeUniqueConstraintError") {
//       return res.status(409).json({ message: "Email or phone or user ID already exists" });
//     }
//     if (error.name === "SequelizeValidationError") {
//       return res.status(400).json({ message: error.errors[0].message });
//     }

//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports ={
//     createStudentController
// }
