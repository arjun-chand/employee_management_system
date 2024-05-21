const { Sequelize } = require('sequelize');
const dotenv = require("dotenv").config({ path: '.env.dev' });

console.log("Host name"+process.env.DB_HOST)
console.log("Database name"+process.env.DB_NAME)
console.log("User name"+process.env.DB_USER)
console.log("Password"+process.env.DB_PASSWORD)
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false
    }
);

module.exports = sequelize;
