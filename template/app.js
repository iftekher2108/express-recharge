const express = require("express");
const app = express();

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
db.sync(
  // { force: true }
).then(() => {
    console.log('Database synced!');
  }).catch(err => {
    console.error('Database sync failed:', err);
  });


module.exports = app;
