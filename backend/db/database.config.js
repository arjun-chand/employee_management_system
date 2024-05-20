const  { Sequelize }  = require("sequelize");
const dotenv = require("dotenv").config({ path: '.env.dev' });


if (dotenv.error) {
    throw new Error("Error loading environment variables from .env.dev file");
}

console.log("DB Password: " + process.env.DB_PASSWORD);
console.log("DB Name: " + process.env.DB_NAME);

const sequelize = new Sequelize(
    process.env.DB_NAME,
    "root",
    process.env.DB_PASSWORD,
    {
        host: "localhost",
        dialect: "mysql",
        logging: false
    },
);

(async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log("Database synchronized successfully.");
    } catch (error) {
        console.error("Error synchronizing database:", error);
    }
})();

module.exports = sequelize;
