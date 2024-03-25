const mySql = require("mysql2/promise");

const connectToDb = async () => {
  try {
    const connection = await mySql.createConnection(process.env.MYSQL_URL);
    // initial connection to the mysql db
    console.log("connecting to db");
    return connection;
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectToDb;
