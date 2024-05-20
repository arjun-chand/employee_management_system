const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./db/database.config");
const cors = require("cors");
const app = express();
const path = require("path");
const routePaths = require("./config/route_paths.config");
const morgan = require("morgan");
const dotenv = require("dotenv").config({path:'./.env.dev'});
const port = process.env.PORT;
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
const corsOptions = {
  origin: 'http://localhost:5173', // Your React app's origin
  credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions));


// Serve static folders

app.get("/", (req, res) => {
  res.send("Server Running");
});
// Dynamically include routes
(async () => {
  const resolvedPaths = await routePaths;
  resolvedPaths.forEach((route) => {
    app.use(require(route));
  });
})();

// sequelize.sync().then(() => {
//   console.log('All models were synchronized successfully.');
// }).catch(err => {
//   console.error('An error occurred while synchronizing models:', err);
// });

app.listen(port, async function () {
    console.log("Server is running on port " + port);
    sequelize
     .authenticate()
     .then(() => {
        console.log("Connection has been established successfully.");
      })
     .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });
});
