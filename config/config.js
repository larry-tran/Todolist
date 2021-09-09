const { config } = require("dotenv");
config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
  test: {
    username: "sa",
    password: "123",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mssql",
  },
  production: {
    username: "sa",
    password: "123",
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mssql",
  },
};
