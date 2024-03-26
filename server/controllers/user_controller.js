const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = "";

//? Importing prisma db
const db = require("../db");

//? Importing bycrypt
const bcrypt = require("bcryptjs");

//? Importing jsonwebtoken
const jwt = require("jsonwebtoken");


// signup for a new user
router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const [rows, fields] = await pool.execute(
      'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
      [req.body.first, req.body.last, req.body.email, hashedPassword]
    );

    const userId = rows.insertId;

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });

    res.status(200).json({
      Mgs: "Success! User created!",
      UserId: userId,
      Token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Error: "Unable to signup",
    });
  }
});

// Logging in a user
router.post("/login", async (req, res) => {
  try {
    const [rows, fields] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [req.body.email]
    );

    if (rows.length === 0) {
      throw new Error("User not found");
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid Details");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });

    res.status(200).json({
      Msg: "User Signed In!",
      User: user,
      Token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Error: err.message,
    });
  }
});

module.exports = router;
