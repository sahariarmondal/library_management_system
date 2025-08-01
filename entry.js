const { Course, Student } = require("./models/association");

// Dummy insert function
async function insertDummyData() {
  try {

    // Insert Course
    const course = await Course.create({
      course_name: "Computer Science",
      course_code: "CS101",
      description: "Fundamentals of Computer Science",
      duration: "4 Years",
    });

    // Insert Student(s)
    await Student.create({
      firstName: "Sahariar",
      lastName: "Mondal",
      email: "sahariar@example.com",
      password: "securepass123",
      phone: "9876543210",
      address: "Kolkata, India",
      course_id: course.id, // associate with the created course
    });

    await Student.create({
      firstName: "Aryan",
      lastName: "Sen",
      email: "aryan@example.com",
      password: "securepass456",
      phone: "9123456789",
      address: "Delhi, India",
      course_id: course.id,
    });

    console.log("Dummy data inserted successfully.");
  } catch (error) {
    console.error("Failed to insert dummy data:", error);
  }
}

module.exports = insertDummyData;
