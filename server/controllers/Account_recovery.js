const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const prisma = require("../db");
const crypto = require("crypto");

const generateToken = () => {
  return crypto.randomBytes(20).toString("hex"); // Generate a 40-character hexadecimal token
};

// Nodemailer configuration
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // or 587 for STARTTLS
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Route for handling password reset request
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const parentUser = await prisma.parents.findUnique({
      where: {
        email: email,
      },
    });

    if (!parentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = generateToken(); // Generate a token
    const resetTokenExpiry = new Date();
    resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1); // Set expiry to 1 hour from now

    // Store the token and its expiry date in the database for the user
    await prisma.parents.update({
      where: {
        id: parentUser.id,
      },
      data: {
        resetToken: token,
        resetTokenExpiry: resetTokenExpiry.toISOString(), // Convert to ISO string format
      },
    });

    // Configure the email options
    const mailOptions = {
      from: "drivingtimetracker@gmail.com",
      to: parentUser.email,
      subject: "Password Reset",
      text: `Click the following link to reset your password: http://localhost:5173/ResetPassword/${token}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error occurred:", error);
        res.status(500).json({ error: "Failed to send email" });
      } else {
        console.log("Email sent:", info.response);
        res.status(200).json({ message: "Password reset email sent" });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for handling password reset from the link
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Find user by token
    const user = await prisma.parents.findFirst({
      where: {
        resetToken: token,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Update user's password and reset token
    const updatedUser = await prisma.parents.update({
      where: {
        id: user.id,
      },
      data: {
        Password: bcrypt.hashSync(newPassword, 12),
        resetToken: null,
      },
    });

    res
      .status(200)
      .json({ Updated: updatedUser, message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
