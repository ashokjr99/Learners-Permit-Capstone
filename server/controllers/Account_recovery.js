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

    // Find the user by email in the parents table
    let parentUser = await prisma.parents.findUnique({
      where: {
        email: email,
      },
    });

    // If user not found in parents table, try finding in users table
    if (!parentUser) {
      // Find the user by email in the users table
      let user = await prisma.users.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // If the user is found in the users table
      const token = generateToken(); // Generate a token
      const resetTokenExpiry = new Date();
      resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1); // Set expiry to 1 hour from now

      // Update the user's reset token and expiry date
      await prisma.users.update({
        where: { id: user.id },
        data: {
          resetToken: token,
          resetTokenExpiry: resetTokenExpiry.toISOString(),
        },
      });

      const mailOptions = {
        from: "drivingtimetracker@gmail.com",
        to: user.email,
        subject: "Password Reset",
        text: `Click the following link to reset your password: http://localhost:5173/#/ResetPassword/?token=${token}&userid=${user.id}`,
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
    } else {
      // If the user is found in the parents table
      const token = generateToken(); // Generate a token
      const resetTokenExpiry = new Date();
      resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1); // Set expiry to 1 hour from now

      // Update the parent's reset token and expiry date
      await prisma.parents.update({
        where: { id: parentUser.id },
        data: {
          resetToken: token,
          resetTokenExpiry: resetTokenExpiry.toISOString(),
        },
      });

      const mailOptions = {
        from: "drivingtimetracker@gmail.com",
        to: parentUser.email,
        subject: "Password Reset",
        text: `Click the following link to reset your password: http://localhost:5173/#/ResetPassword/?token=${token}&userid=${parentUser.id}`,
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
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for handling password reset from the link
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Find user by token in the parents table
    let user = await prisma.parents.findFirst({
      where: {
        resetToken: token,
        AND: { id: req.body.userId },
      },
    });

    // If user not found in parents table, try finding in users table
    if (!user) {
      user = await prisma.users.findFirst({
        where: {
          resetToken: token,
          AND: { id: req.body.userId },
        },
      });
    }

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }
    console.log(user.id);
    console.log("user", user);
    // Update user's password and reset token
    const updatePromise = user.parentId
      ? prisma.users.update({
          where: {
            id: user.id,
          },
          data: {
            Password: bcrypt.hashSync(newPassword, 12),
            resetToken: null,
          },
        })
      : prisma.parents.update({
          where: {
            id: user.id,
          },
          data: {
            Password: bcrypt.hashSync(newPassword, 12),
            resetToken: null,
          },
        });

    // Check if the update was successful
    const updatedUser = await updatePromise;

    if (!updatedUser) {
      return res.status(500).json({ error: "Failed to update password" });
    }

    res
      .status(200)
      .json({ Updated: updatedUser, message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
