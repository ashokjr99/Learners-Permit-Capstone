//? Allows us to have sub routes in express
const router = require("express").Router();

//? Importing prisma db
const prisma = require("../db");

//? Importing bycrypt
const bcrypt = require("bcryptjs");

//? Importing jsonwebtoken
const jwt = require("jsonwebtoken");

//? posting a stat
//! add validation to routes through using a library or manually
router.post("/post", async (req, res) => {
  try {
    const stats = await prisma.stats.create({
      data: {
        userId: req.user.id,
        mileage: req.body.mileage,
        weather: req.body.weather,
        from: req.body.from,
        to: req.body.to,
        practiced: req.body.practiced,
      },
    });

    res.status(200).json({
      Created: stats,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/stats/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const userStats = await prisma.user.findUnique({
      where: { id: userId },
      select: { stats: true },
    });

    if (!userStats) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(userStats.stats);
    res.json(userStats.stats);
  } catch (error) {
    console.log("Error fetching stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
