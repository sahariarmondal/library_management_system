const Student = require("../models/student");

const createStudent = async (data, transaction) => {
  try {
    const student = await Student.create(data, {transaction});
    return student;
  } catch (error) {
    throw error;
  }
};

const getStudentIdByUserId = async (user_id) => {
  try {
    const student = await Student.findOne({
      where: { user_id }
    });
    if (!student) {
      throw new Error("No Student Exist with this UserId"); // or throw error if needed
    }
    return student;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  createStudent,
  getStudentIdByUserId
};
