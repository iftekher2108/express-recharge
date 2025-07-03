const express = require("express");
const app = express();
const path = require('path');

//? ================= Base path (e.g., your `/` folder) ======================
const moduleAlias = require('module-alias');
const basePath = __dirname;
moduleAlias.addAliases({
  '@utils': path.resolve(basePath, 'Utilities'),
  '@config': path.resolve(basePath, 'Configs'),
  '@module': path.resolve(basePath, 'Modules'),
  '@public': path.resolve(basePath, 'public'),
  '@middleware': path.resolve(basePath, 'Middlewares'),
});
//? ================= Base path (e.g., your `/` folder) ======================


//? ======================= json allow ==========================
app.use(express.json());
//? ======================= json allow ==========================


//? ====================== urlencoded allow ======================
app.use(
  express.urlencoded({
    extended: true,
  })
);
//? ====================== urlencoded allow ======================


//? ====================== cors allow =========================
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
//? ====================== cors allow =========================


//? ===================== database connection =======================
const db = require("@config/database");
// database init
db.sync(
  // { force: true }
).then(() => {
    console.log('Database synced!');
  }).catch(err => {
    console.error('Database sync failed:', err);
  });
//? ===================== database connection =======================


//! ====================== Main Route ===============================
const mainRouter = require('./mainRoute')
app.use('',mainRouter);
//! ====================== Main Route ===============================


module.exports = app;
