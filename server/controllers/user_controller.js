//? Allows us to have sub routes in express
const router = require("express").Router();

//? Importing prisma db
const prisma = require("../db");

//? Importing bycrypt
const bcrypt = require("bcryptjs");

//? Importing jsonwebtoken
const jwt = require("jsonwebtoken");

router.post("/signup_child", async (req, res) => {
  console.log(req.user);
  try {
    // checks for parent, as they are the only ones who can sign up children
    if (req.user.type === "parent") {
      const user = await prisma.users.create({
        data: {
          FirstName: req.body.first,
          LastName: req.body.last,
          email: req.body.email,
          Password: bcrypt.hashSync(req.body.password, 12),
          // Need to work on figuring out the parentId and how to grab it from the logged in parent
          parentId: req.user.id,
          // from validate session
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

module.exports = router;
