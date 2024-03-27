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

function mySelect ( searchKey, searchValue, replaceKey, replaceValue ) {
  const theSelect = {
    where: {
      searchKey: searchValue
    },
    data: { replaceKey: replaceValue }
  }
  return theSelect;

}

router.post("/edit", async (req, res) => {
  try {
    let searchKey = req.body.searchKey;
    let searchValue = req.body.searchVale;
    let replaceKey = req.body.replacementKey;
    let replaceValue = red.body.replacementValue;

    const user = await prisma.stats.update( mySelect( searchKey, searchValue, replaceKey, replaceValue) )
 
    res.status(200).json({
      Updated: "RECORD",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
