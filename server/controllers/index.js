//? Import controllers
const userController = require("./user_controller");
const statsController = require("./stats_controller");
const parentController = require("./parent_controller");
const recoveryController = require("./Account_recovery");

//? Export controllers
module.exports = { userController, statsController, parentController, recoveryController };

// shortcut to export all in one file
