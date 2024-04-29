const express = require("express");
const bcrypt = require("bcryptjs");
const prisma = require("../db");

const router = express.Router();

// PUT endpoint for updating user profile (first name, last name, email)
router.put("/profile", async (req, res) => {
  const { type, id } = req.user;
  const { firstName, lastName, email, targetHours } = req.body;
  console.log(req.user);
  try {
    // Check if the user type is either "parent" or "user"
    if (type !== "parent" && type !== "child") {
      return res.status(403).json({ error: "Unauthorized access." });
    }

    // Update user profile based on user type
    let updatedUser;
    if (type === "parent") {
      updatedUser = await prisma.parents.update({
        where: { id: id },
        data: { FirstName: firstName, LastName: lastName, email },
      });
    } else {
      updatedUser = await prisma.users.update({
        where: { id: id },
        data: { FirstName: firstName, LastName: lastName, email, targetHours },
      });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating user profile." });
  }
});

// PUT endpoint for updating user password
router.put("/password", async (req, res) => {
  const { type, id } = req.user;
  const { currentPassword, newPassword } = req.body;

  try {
    // Check if the user type is either "parent" or "user"
    if (type !== "parent" && type !== "child") {
      return res.status(403).json({ error: "Unauthorized access." });
    }

    // Retrieve user from the database based on user type
    let user;
    if (type === "parent") {
      user = await prisma.parents.findUnique({ where: { id: id } });
    } else {
      user = await prisma.users.findUnique({ where: { id: id } });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Verify current password
    console.log("Current Password:", currentPassword);
    console.log("User Password:", user.Password); // Ensure 'Password' matches your actual database field name
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.Password // Use the correct database field name for the password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid current password." });
    }

    // Update user password based on user type
    if (type === "parent") {
      await prisma.parents.update({
        where: { id: id },
        data: { Password: await bcrypt.hash(newPassword, 12) }, // Use the correct database field name for the password
      });
    } else {
      await prisma.users.update({
        where: { id: id },
        data: { Password: await bcrypt.hash(newPassword, 12) }, // Use the correct database field name for the password
      });
    }

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error updating user password:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating user password." });
  }
});

module.exports = router;
