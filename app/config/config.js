require("dotenv").config();

module.exports = {
  development: {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    dialectOptions: {
      createDatabase: true,
    },
  },
  production: {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    dialectOptions: {
      createDatabase: true,
    },
  },
  test: {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    dialectOptions: {
      createDatabase: true,
    },
  },
};
