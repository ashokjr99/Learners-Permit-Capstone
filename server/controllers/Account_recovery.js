const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const prisma = require("../db");
const { body, validationResult } = require("express-validator");

// Function to generate a random token
const generateToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Route for handling password reset request
router.post(
  "/forgot-password",
  // [
  //   body("email").isEmail().normalizeEmail(),
  //   // Add more validation rules for email and other fields if needed
  // ],
  async (req, res) => {
    // Validate input data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email } = req.body;

      // Find user by email
      const user = await prisma.users.findUnique({
        where: {
          email: email,
        },
      });
      console.log(user.email);
      if (!user) {        
        return res.status(404).json({ error: "User not found" });
      };

      // Generate a unique token
      const token = generateToken();

      // Save the token in the database or in-memory store (Redis, etc.)
      // For simplicity, we'll assume you have a column in your users table to store the reset token
      await prisma.users.update({
        where: {
          id: user.id,
        },
        data: {
          resetToken: token,
          resetTokenExpiry: Date.now() + 3600000, // Token expiry in 1 hour (optional)
        },
      });

      // Send password reset email with the token link
      const resetUrl = `http://yourdomain.com/reset-password?token=${token}`;
      const mailOptions = {
        from: "drivetimetracker@gmail.com",
        to: email,
        subject: "Password Reset",
        text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "Password reset email sent" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Route for handling password reset from the link
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Find user by token
    const user = await prisma.users.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: Date.now(),
        },
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Update user's password and reset token
    const updatedUser = await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        Password: bcrypt.hashSync(newPassword, 12),
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
