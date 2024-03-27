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
