const { Sequelize } = require("sequelize");
const dotenv = require("dotenv").config({ path: '.env.dev' });

console.log("DB Password: " + process.env.DB_PASSWORD);
console.log("DB Name: " + process.env.DB_NAME);

const sequelize = new Sequelize(
    process.env.DB_NAME,
    "root",
    process.env.DB_PASSWORD,
    {
        host: "localhost",
        dialect: "mysql", // The dialect for MySQL is 'mysql'
        logging: false, // Set to 'true' to see SQL logs
    }
);

(async () => {
    await sequelize.sync();
  })();

module.exports = sequelize;
