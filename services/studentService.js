const Student = require("../models/student");

const createStudent = async (data, transaction) => {
  try {
    const student = await Student.create(data, {transaction});
    return student;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createStudent
};
