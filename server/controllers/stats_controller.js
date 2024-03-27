//? Allows us to have sub routes in express
const router = require("express").Router();

//? Importing prisma db
const prisma = require("../db");

//? Importing bycrypt
const bcrypt = require("bcryptjs");

//? Importing jsonwebtoken
const jwt = require("jsonwebtoken");

// sdfdsfsdf

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
router.post("/edit", async (req, res) => {
  try {
    const updateStat = await prisma.stats.update({
      where: {
        id: req.stats.id,
        userId: req.user.id,
      },
      data: {
        mileage: req.body.mileage,
        weather: req.body.weather,
        from: req.body.from,
        to: req.body.to,
        practiced: req.body.practiced,
      },
    });

    res.status(200).json({
      Updated: updateStat,
    });
  } catch (err) {
    console.log(err);
  }
});

//? Define delete endpoint for deleting stats by ID
router.delete("/delete/:statId", async (req, res) => {
  const statId = parseInt(req.params.statId);
  // make into valid session later

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

//// function mySelect ( searchKey, searchValue, replaceKey, replaceValue ) {
////   var objStr = "{ \"where\": { \"" + searchKey + "\": \"" + searchValue + "\" },";  // Creates the string to update the database 
////   objStr = objStr + " \"data\": { \"" + replaceKey + "\": \"" + replaceValue + "\" }}"; 
////   var newObj = JSON.parse( objStr );  // Converts string into json.obj
////   return newObj

//// }

router.put('/edit/:id', async (req, res) => {
  try {
    const updateStat = await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: {
        mileage: req.body.mileage,  
        weather: req.body.weather,  
        from: req.body.from,     
        to: req.body.to,       
        practiced: req.body.practiced,
      },
    })

    res.status(200).json({
      Updated: updateStat,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
