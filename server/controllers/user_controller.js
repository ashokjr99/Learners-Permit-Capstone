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
//     const [rows, fields] = await pool.execute(
//       "SELECT * FROM users WHERE email = ?",
//       [req.body.email]
//     );

//     if (rows.length === 0) {
//       throw new Error("User not found");
//     }

//     const user = rows[0];
//     const passwordMatch = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );

//     if (!passwordMatch) {
//       throw new Error("Invalid Details");
//     }

//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//       expiresIn: 60 * 60 * 24,
//     });

//     res.status(200).json({
//       Msg: "User Signed In!",
//       User: user,
//       Token: token,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       Error: err.message,
//     });
//   }
// });

module.exports = router;
