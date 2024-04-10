//? Allows us to have sub routes in express
const router = require("express").Router();

//? Importing prisma db
const prisma = require("../db");

//? posting a stat
//! add validation to routes through using a library or manually
router.post("/post", async (req, res) => {
  try {
    const stats = await prisma.stats.create({
      data: {
        userId: req.user.id,
        hours: req.body.hours,
        day: req.body.day,
        weather: req.body.weather,
        from: req.body.from,
        to: req.body.to,
        practiced: req.body.practiced,
        vehicle_type: req.body.vehicle_type,
      },
    });

    res.status(200).json({
      Created: stats,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Error: err,
    });
  }
});

//? get all stats
router.get("/all", async (req, res) => {
  const userId = parseInt(req.user.id);

  try {
    const userStats = await prisma.users.findUnique({
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

//? edit stats
router.put("/edit", async (req, res) => {
  try {

    const updateStat = await prisma.stats.update({
      where: {
        id: req.stats.id,
        userId: req.user.id,
      },
      data: {
        hours: req.body.hours,
        vehicle_type: req.body.vehicle_type,
        weather: req.body.weather,
        from: req.body.from,
        to: req.body.to,
        practiced: req.body.practiced,
      },
    });

    res.status(200).json({
      Updated: updateStat,
      Updated: updateStat,
    });
  } catch (err) {
    console.log(err);
  }
});

// Define delete endpoint for deleting stats by ID
router.delete("/delete/:statId", async (req, res) => {
  const statId = parseInt(req.params.statId);

  try {
    // Use Prisma's delete method to delete the stats
    const deletedStat = await prisma.stats.delete({
      where: { id: statId },
    });

    // Send a success message in the response
    res.status(200).json({
      message: "Stats deleted successfully",
      deletedStat: deletedStat,
    });
  } catch (error) {
    // Handle errors and send an error response
    console.log("Error deleting stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = router;
