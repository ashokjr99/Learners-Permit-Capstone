// Import necessary modules and setup Express router
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const prisma = require("../db");

// PUT endpoint for updating user profile (first name, last name, email)
router.put("/settings/profile", async (req, res) => {
  const { userType, userId } = req.user; // Assuming you have middleware to extract user type and ID from the request
  const { firstName, lastName, email } = req.body;

  try {
    // Check if the user type is either "parent" or "user"
    if (userType !== "parent" && userType !== "user") {
      return res.status(403).json({ error: "Unauthorized access." });
    }

    // Update user profile based on user type
    let updatedUser;
    if (userType === "parent") {
      updatedUser = await prisma.parents.update({
        where: { id: userId },
        data: { firstName, lastName, email },
      });
    } else {
      updatedUser = await prisma.users.update({
        where: { id: userId },
        data: { firstName, lastName, email },
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
router.put("/settings/password", async (req, res) => {
  const { userType, userId } = req.user; // Assuming you have middleware to extract user type and ID from the request
  const { currentPassword, newPassword } = req.body;

  try {
    // Check if the user type is either "parent" or "user"
    if (userType !== "parent" && userType !== "user") {
      return res.status(403).json({ error: "Unauthorized access." });
    }

    // Retrieve user from the database based on user type
    const user =
      userType === "parent"
        ? await prisma.parents.findUnique({ where: { id: userId } })
        : await prisma.users.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Verify current password - Implement this function based on your requirements
    const isPasswordValid = await verifyPassword(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid current password." });
    }

    // Update user password based on user type
    const updatedUser =
      userType === "parent"
        ? await prisma.parents.update({
            where: { id: userId },
            data: { password: await hashPassword(newPassword) },
          })
        : await prisma.users.update({
            where: { id: userId },
            data: { password: await hashPassword(newPassword) },
          });

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error updating user password:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating user password." });
  }
});

// Export the router
module.exports = router;
