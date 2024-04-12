const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const prisma = require("../db");
// const { body, validationResult } = require("express-validator");

// Nodemailer configuration
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  // service: "gmail",
  port: 465, // or 587 for STARTTLS
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


// Route for handling password reset request
router.post(
  "/forgot-password",
  async (req, res) => {
    try {
      const { email } = req.body;

      // Find the user by email
      const parentUser = await prisma.parents.findUnique({
        where: {
          email: email,
        },
      });

      // Check if the user exists
      if (!parentUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // Configure the email options
      const mailOptions = {
        from: "drivingtimetracker@gmail.com",
        to: parentUser.email, // Use user.email to send the email to the user's email address
        subject: "Password Reset",
        text: "This is a test email from Nodemailer.",
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
