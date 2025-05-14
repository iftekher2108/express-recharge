const express = require("express");
const app = express();

// const limiter = require('./Config/rate-limiter')
// rate-limit set global
// app.use(limiter)

// module-alias.js
const path = require('path');
const moduleAlias = require('module-alias');
// Base path (e.g., your `/` folder)
const basePath = __dirname;
moduleAlias.addAliases({
  '@utils': path.resolve(basePath, 'Utilities'),
  '@config': path.resolve(basePath, 'Configs'),
  '@module': path.resolve(basePath, 'Modules'),
  '@public': path.resolve(basePath, 'public'),
  '@middleware': path.resolve(basePath, 'Middlewares'),
});

// json allow
app.use(express.json());
// urlencoded allow
app.use(
  express.urlencoded({
    extended: true,
  })
);

// cors allow
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

// database
const db = require("@config/database");

// database init
db.sync({ alter: true }).then(() => {
    console.log('Database synced!');
  }).catch(err => {
    console.error('Database sync failed:', err);
  });

// modular path
const userRoute = require("@module/Users/routes/routes");

// modular routes Register
app.use("/", userRoute);


// app.use("/api/v1", (req, res, next) => {
//   console.log("API v1 route accessed");
//   next();
// });

// middleware
// app.use(middleware)

module.exports = app;
