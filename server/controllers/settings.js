// Import necessary modules and setup Express router
const router = require("express").Router();

const prisma = require("../db");

// const prisma = new PrismaClient();

// PUT endpoint for updating user profile (first name, last name, email)
router.put("/api/settings/profile", async (req, res) => {
  const { userId } = req.user; // Assuming you have middleware to extract user ID from the request
  const { firstName, lastName, email } = req.body;

  try {
    // Update user profile
    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: { firstName, lastName, email },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating user profile." });
  }
});

// PUT endpoint for updating user password
router.put("/api/settings/password", async (req, res) => {
  const { userId } = req.user; // Assuming you have middleware to extract user ID from the request
  const { currentPassword, newPassword } = req.body;

  try {
    // Retrieve user from the database
    const user = await prisma.users.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Verify current password
    const isPasswordValid = verifyPassword(currentPassword, user.password); // Implement this function

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid current password." });
    }

    // Update user password
    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: { password: hashPassword(newPassword) }, // Implement hashPassword function
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
