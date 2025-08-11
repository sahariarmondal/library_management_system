const Course = require("../models/course");

const addCourseService = async (courseData) => {
  const { course_name, course_code, description, duration, types } = courseData;

  // 1. Validation
  if (!course_name || !course_code || !duration || !types) {
    throw new Error("course_name, course_code, duration, and types are required");
  }

  // Validate types value
  const validTypes = ["Full-time", "Part-time", "Online"];
  if (!validTypes.includes(types)) {
    throw new Error(`Invalid course type. Must be one of: ${validTypes.join(", ")}`);
  }

  // 2. Check uniqueness
  const existingCourse = await Course.findOne({ where: { course_code } });
  if (existingCourse) {
    throw new Error("Course with this code already exists");
  }

  // 3. Create Course
  const course = await Course.create({
    course_name,
    course_code,
    description,
    duration,
    types
  });

  return course;
};

module.exports = { addCourseService };
