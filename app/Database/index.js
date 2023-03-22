require("dotenv/config");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

module.exports = function () {
  const db = new Sequelize(
    config.databse,
    config.username,
    config.password,
    config,
    {
      define: {
        freezeTableName: true,
      },
    }
  );

  db.authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
  return db;
};
