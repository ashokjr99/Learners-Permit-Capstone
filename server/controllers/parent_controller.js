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
        resetTokenExpiry: new Date(),
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

module.exports = router;
