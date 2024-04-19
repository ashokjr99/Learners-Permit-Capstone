//? Allows us to have sub routes in express
const router = require("express").Router();

//? Importing prisma db
const prisma = require("../db");

//? Importing bycrypt
const bcrypt = require("bcryptjs");

//? Importing jsonwebtoken
const jwt = require("jsonwebtoken");

let validWeather = ["Rainy", "Snowy", "Clear"];

//? posting a stat
//! add validation to routes through using a library or manually
router.post("/post", async (req, res) => {
  try {
    if (!validWeather.includes(req.body.weather)) {
      // disposing of requests that do not have validWeather options
      res.status(400).send("does not work");
      return;
    }

    const stats = await prisma.stats.create({
      data: {
        userId: req.user.id,
        hours: req.body.hours,
        day: req.body.day,
        weather: req.body.weather,
        from: req.body.from,
        to: req.body.to,
        practiced: req.body.practiced,
        notes: req.body.notes,
        vehicle_type: req.body.vehicle_type,

        parent_approval: false,
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
  const userId = req.user.id;

  try {
    //? logic for filtering out the endDate and startDate
    const filters = {};
    // set an array to hold the endDate or the startDate if needed
    console.log(req.query);
    if ("endDate" in req.query || "startDate" in req.query) {
      // if the endDate or the startDate are the only selections in the query...
      filters.timestamp = {};
      if ("endDate" in req.query) {
        // if endDate only...
        filters.timestamp.lte = new Date(req.query.endDate);
      }
      if ("startDate" in req.query) {
        // if startDate only...
        filters.timestamp.gte = new Date(req.query.startDate);
      }
    }

    //? logic for filtering out the day and night
    // takes front end code and matches it with the query/request
    if ("time" in req.query) {
      if (req.query.time === "Day") {
        filters.day = true;
      } else if (req.query.time === "Night") {
        filters.day = false;
      }
    }

    //? logic for filtering out by weather type
    if ("weather" in req.query && validWeather.includes(req.query.weather)) {
      // if "weather" is in the fetch "../all?weather=.. and includes valid weather types."
      filters.weather = req.query.weather;
    }

    // console.log(filters, "this is filters");

    const userStats = await prisma.stats.findMany({
      where: {
        userId: userId,

        ...filters,
        // makes the filters findable and pluckable
      },
    });

    if (!userStats) {
      return res.status(404).json({ error: "User not found" });
    }
    // console.log(userStats);

    let totalHours = 0;
    let totalDrives = userStats.length;

    // capturing total amounts of each weather
    let pieChartData = {
      snowy: 0,
      rainy: 0,
      clear: 0,
    };

    // add 1 to each post for the specific weather
    userStats.forEach((obj) => {
      console.log(obj.hours);
      totalHours += parseFloat(obj.hours);

      if (obj.weather.toLowerCase() === "snowy") {
        pieChartData.snowy++;
      }
      if (obj.weather.toLowerCase() === "rainy") {
        pieChartData.rainy++;
      } else if (obj.weather.toLowerCase() === "clear") {
        pieChartData.clear++;
      }
    });

    res.status(200).json({
      userStats,
      summaryData: { totalDrives, totalHours },
      pieChartData,
    });
  } catch (error) {
    console.log("Error fetching stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//? edit stats
router.put("/edit/:id", async (req, res) => {
  try {
    const updateStat = await prisma.stats.update({
      where: {
        id: parseInt(req.params.id),
        userId: req.user.id,
      },
      data: {
        hours: req.body.hours,
        vehicle_type: req.body.vehicle_type,
        day: req.body.day,
        weather: req.body.weather,
        from: req.body.from,
        to: req.body.to,
        notes: req.body.notes,
        practiced: req.body.practiced,
        parent_approval: req.body.parent_approval,
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

router.get("/child_stats", async (req, res) => {
  try {
    //? logic for filtering out the endDate and startDate
    const filters = {};
    // set an array to hold the endDate or the startDate if needed
    console.log(req.query);
    if ("endDate" in req.query || "startDate" in req.query) {
      // if the endDate or the startDate are the only selections in the query...
      filters.timestamp = {};
      if ("endDate" in req.query) {
        // if endDate only...
        filters.timestamp.lte = new Date(req.query.endDate);
      }
      if ("startDate" in req.query) {
        // if startDate only...
        filters.timestamp.gte = new Date(req.query.startDate);
      }
    }

    //? logic for filtering out the day and night
    // takes front end code and matches it with the query/request
    if ("time" in req.query) {
      if (req.query.time === "Day") {
        filters.day = true;
      } else if (req.query.time === "Night") {
        filters.day = false;
      }
    }

    //? logic for filtering out by weather type
    if ("weather" in req.query && validWeather.includes(req.query.weather)) {
      // if "weather" is in the fetch "../all?weather=.. and includes valid weather types."
      filters.weather = req.query.weather;
    }

    // console.log(filters, "this is filters");

    const userStats = await prisma.users.findMany({
      where: {
        parentId: req.user.id,
      },
      select: {
        id: true,
        FirstName: true,
        stats: {
          where: { ...filters },
        },
      },
    });
    console.log("Child Stats" + userStats);
    if (!userStats) {
      return res.status(404).json({ error: "User not found" });
    }

    const results = []

    for (let user of userStats) {
      user.stats.forEach(stat => {
        results.push({...stat, FirstName:user.FirstName})
      })
    }
    
    console.log(JSON.stringify(userStats));

    let totalHours = 0;
    let totalDrives = results.length;

    results.forEach((obj) => {
      console.log(obj.hours);
      totalHours += parseFloat(obj.hours);
    })

    res.status(200).json({
      userStats: results,
      summaryData: { totalDrives, totalHours },
    });
  } catch (error) {
    console.log("Error fetching stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
