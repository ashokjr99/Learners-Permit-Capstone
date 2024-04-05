//? Import controllers
const userController = require("./user_controller");
const statsController = require("./stats_controller");
const parentController = require("./parent_controller")

//? Export controllers
module.exports = { userController, statsController, parentController };

// shortcut to export all in one file