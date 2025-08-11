const { addCourseService } = require("../services/courseServices");

const addCourseController = async (req, res) => {
  try {
    const course = await addCourseService(req.body);

    res.status(201).json({
      success: true,
      message: "Course added successfully",
      data: course
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { addCourseController };
