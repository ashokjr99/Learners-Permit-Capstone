<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
=======
//? Allows us to have sub routes in express
const router = require("express").Router();

//? Importing prisma db
const prisma = require("../db");

//? Importing bycrypt
>>>>>>> 85eedca834d136ce0df3030a5bf9d4b9e0333129
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { body } = require("express-validator");

<<<<<<< HEAD
// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Handle connection errors
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
  } else {
    console.log("Connected to MySQL database!");
    connection.release(); // Release the connection
  }
});

// Validation middleware for signup route
const validateSignup = [
  body("email").isEmail().normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Signup route
router.post("/signup", validateSignup, async (req, res) => {
  try {
    // Validate input data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const [rows, fields] = await pool.execute(
      "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
      [req.body.first, req.body.last, req.body.email, hashedPassword]
    );

    const userId = rows.insertId;

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "24h", // Token expires in 24 hours
    });

    res.status(200).json({
      success: true,
      message: "Success! User created!",
      data: { userId, token },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Unable to signup" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    const [rows, fields] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    console.log("User data:", rows); // Log user data for debugging

    if (rows.length === 0) {
      throw new Error("User not found");
    }

    const user = rows[0];

    console.log("User password:", user.password); // Log user password for debugging

    const passwordMatch = await bcrypt.compare(password, user.Password);


    console.log("Password Match:", passwordMatch); // Log password match result

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h", // Token expires in 24 hours
    });

    res.status(200).json({
      success: true,
      message: "User Signed In!",
      data: { user, token },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

=======
//? signing up new user
//! add validation to routes through using a library or manually
router.post("/signup", async (req, res) => {
  try {
    const user = await prisma.users.create({
      data: {
        FirstName: req.body.first,
        LastName: req.body.last,
        email: req.body.email,
        Password: bcrypt.hashSync(req.body.password, 12),
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });

    res.status(200).json({
      Mgs: "Success! User created!",
      User: user,
      Token: token,
    });
  } catch (err) {
    console.log(err);
  }
});

// //? Logging in a user
// router.post("/login", async (req, res) => {
//   try {
//     const [rows, fields] = await pool.execute(
//       "SELECT * FROM users WHERE email = ?",
//       [req.body.email]
//     );

//     if (rows.length === 0) {
//       throw new Error("User not found");
//     }

//     const user = rows[0];
//     const passwordMatch = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );

//     if (!passwordMatch) {
//       throw new Error("Invalid Details");
//     }

//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//       expiresIn: 60 * 60 * 24,
//     });

//     res.status(200).json({
//       Msg: "User Signed In!",
//       User: user,
//       Token: token,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       Error: err.message,
//     });
//   }
// });
>>>>>>> 85eedca834d136ce0df3030a5bf9d4b9e0333129

module.exports = router;
