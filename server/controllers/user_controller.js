//? Allows us to have sub routes in express
const router = require("express").Router();

//? Importing prisma db
const prisma = require("../db");

//? Importing bycrypt
const bcrypt = require("bcryptjs");

//? Importing jsonwebtoken
const jwt = require("jsonwebtoken");

const validateSession = require("../middleware/validate-session");

router.post("/signup_child", validateSession, async (req, res) => {
  try {
    // checks for parent, as they are the only ones who can sign up children
    if (req.user.type === "parent") {
      const user = await prisma.users.create({
        data: {
          FirstName: req.body.first,
          LastName: req.body.last,
          email: req.body.email,
          targetHours: req.body.targetHours,
          Password: bcrypt.hashSync(req.body.password, 12),
          // Need to work on figuring out the parentId and how to grab it from the logged in parent
          parentId: req.user.id,
          // from validate session
          resetTokenExpiry: new Date(),
        },
      });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });

      res.status(200).json({
        Mgs: "Success! User created!",
        User: user,
        Token: token,
      });
    } else {
      res.status(400).json({
        Message: "Parent only route",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Error: err,
    });
  }
});

router.post("/login_child", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.Password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24, // Token expires in 24 hours
    });

    res.status(200).json({
      message: "User logged in successfully",
      user: user,
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
