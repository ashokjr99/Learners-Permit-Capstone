//? Allows us to have sub routes in express
const router = require("express").Router();

//? Importing prisma db
const prisma = require("../db");

//? Importing bycrypt
const bcrypt = require("bcryptjs");

//? Importing jsonwebtoken
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    const parentUser = await prisma.parents.create({
      data: {
        FirstName: req.body.first,
        LastName: req.body.last,
        email: req.body.email,
        Password: bcrypt.hashSync(req.body.password, 12),
        resetTokenExpiry: new Date().toISOString(),
        resetToken: "L",
      },
    });

    const token = jwt.sign({ id: parentUser.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });

    res.status(200).json({
      Mgs: "Success! User created!",
      User: parentUser,
      Token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Error: err,
    });
  }
});

//? Logging in a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const parentUser = await prisma.parents.findUnique({
      where: {
        email: email,
      },
    });

    if (!parentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, parentUser.Password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: parentUser.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24, // Token expires in 24 hours
    });

    res.status(200).json({
      message: "User logged in successfully",
      user: parentUser,
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to delete a child account
router.delete("/delete-child/:childId", async (req, res) => {
  try {
    const parentId = req.user.id; // Assuming the parent's ID is extracted from the token

    // Check if the child account exists and is associated with the parent
    const childUser = await prisma.users.findUnique({
      where: {
        id: req.params.Id,
        parentId: parentId,
      },
    });

    if (!childUser) {
      return res.status(404).json({
        error: "Child account not found or not associated with the parent.",
      });
    }

    // Delete the child account
    await prisma.users.delete({
      where: { id: req.params.childId },
    });

    res.status(200).json({ message: "Child account deleted successfully." });
  } catch (error) {
    console.error("Error deleting child account:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the child account." });
  }
});

module.exports = router;
