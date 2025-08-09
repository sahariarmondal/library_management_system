const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Admin = require("../models/admin");
const Student = require("../models/student");
const generateToken = require("../utility/utility");
const studentService = require("../services/studentService");
const adminService = require("../services/adminService");
const sequelize = require("../config/db_config");
const { Op } = require("sequelize");


// Register
// const register = async (req, res) => {
//   const t = await sequelize.transaction();
//   try {
//     const { email, password, role, phone_no } = req.body;

//     if (!["student", "admin"].includes(role)) {
//       return res.status(400).json({ error: "Invalid role" });
//     }

//     const existingUser = await User.findOne({
//   where: {
//     [Op.or]: [
//       { email: email },
//       { phone_no: phone_no }
//     ]
//   },
//   transaction: t,
// });
//     if (existingUser) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create(
//       { email, password: hashedPassword, role, phone_no },
//       { transaction: t }
//     );
//     let createdEntity;
//     if (role === "student") {
//       const studentData = {
//         ...req.body.extraData,
//         email: req.body.email,
//         phone_no: req.body.phone_no,
//         user_id: newUser.user_id, // required foreign key
//       };
//       console.log(studentData);

//       await studentService.createStudent(studentData, t);
//       createdEntity = "Student";
//     } else {
//       const adminData = {
//         ...req.body.extraData,
//         email: req.body.email,
//         phone_no: req.body.phone_no,
//         user_id: newUser.user_id,
//       };

//       await adminService.createAdmin(adminData, t);
//       createdEntity = "Admin"
//     }
//     await t.commit();
//     const token = generateToken(newUser);
//     res.status(201).json({ token, message: `${createdEntity} Registered successfully` });
//   } catch (err) {
//     await t.rollback();
//     res.status(500).json({
//       message: err.message,
//     });
//   }
// };


// In studentAuthController.js

const registerStudent = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { email, password, phone_no, extraData } = req.body;

    const existingUser = await User.findOne({
      where: { [Op.or]: [{ email }, { phone_no }] },
      transaction: t,
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create(
      { email, password: hashedPassword, role: "student", phone_no },
      { transaction: t }
    );

    const studentData = {
      ...extraData,
      email,
      phone_no,
      user_id: newUser.user_id,
    };

    await studentService.createStudent(studentData, t);
    await t.commit();

    const token = generateToken(newUser);
    res.status(201).json({ token, message: "Student Registered successfully" });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ message: err.message });
  }
};


const registerAdmin = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { email, password, phone_no, extraData, secret_code } = req.body;

    
    if (secret_code !== process.env.ADMIN_SECRET_CODE) {
      return res.status(403).json({ error: "Invalid admin secret code" });
    }

    
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { phone_no }],
      },
      transaction: t,
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create(
      {
        email,
        password: hashedPassword,
        role: "admin",
        phone_no,
      },
      { transaction: t }
    );

    const adminData = {
      ...extraData,
      email,
      phone_no,
      user_id: newUser.user_id,
    };

    await adminService.createAdmin(adminData, t);
    await t.commit();

    const token = generateToken(newUser);
    res.status(201).json({ token, message: "Admin Registered successfully" });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ message: err.message });
  }
};



// Login
// const login = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ where: { email } });
//   if (!user) return res.status(400).json({ error: "Invalid credentials" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

//   const token = generateToken(user);
//   res.status(200).json({ token, message: "Login successful" });
// };

// module.exports = { login, registerStudent, registerAdmin };

// 


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // If user is student, check if active
    if (user.role === "student") {
      const student = await Student.findOne({ where: { user_id: user.user_id } });
      if (!student || student.status !== "Active") {
        return res.status(403).json({ error: "Student account is inactive" });
      }
    }

    // No status check for admins, just generate token
    const token = generateToken(user);
    res.status(200).json({ token, message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { login, registerStudent, registerAdmin };

