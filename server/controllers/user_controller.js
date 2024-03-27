//? Allows us to have sub routes in express
const router = require("express").Router();

//? Importing prisma db
const prisma = require("../db");

//? Importing bycrypt
const bcrypt = require("bcryptjs");

//? Importing jsonwebtoken
const jwt = require("jsonwebtoken");

//? signing up new user
//! add validation to routes through using a library or manually
router.post("/signup", async (req, res) => {
  try {
    const user = await prisma.users.create({
      data: {
        FirstName: req.body.first,
        LastName: req.body.last,
        email: req.body.email,
        Password: bcrypt.hashSync(req.body.password, 12),
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
  } catch (err) {
    console.log(err);
  }
});

// //? Logging in a user
// router.post("/login", async (req, res) => {
//   try {
//     let { email, password } = req.body;

//     const user = await User.findOne({ email: email });

//     if (!user) throw new Error("User not found");

//     let passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) throw new Error("Invalid Details");

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: 60 * 60 * 24,
//     });
//     console.log("user.js", token);

//     res.status(200).json({
//       Msg: "User Signed In!",
//       User: user,
//       Token: token,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       Error: err,
//     });
//   }
// });

module.exports = router;
