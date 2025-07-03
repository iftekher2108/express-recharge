const express = require("express");
const router = express.Router();
const limiter = require("@middleware/rateLimiter");
const UserController = require("@module/Users/Controllers/UserController");
const AuthController = require("@module/Users/Controllers/AuthController");
const Auth = require("@middleware/Auth");
const groupRoute = require("@utils/groupRoute");
const upload = require("@utils/fileUpload");

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the API System" });
});

// auth login and register
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);


// html to pdf generate
// router.post("
// /file-upload",
//  upload({ dirPath: "/uploads", fileName: "user_file" }).single('file'),
//  UserController.fileUpload);

// router.get("/pdfgenerate", UserController.pdfGenerate);
// router.get('/scrape-data-get',UserController.scrapeDataGet);


// middleware before after piority matters

// groupRoute(router, Auth, (admin) => {
//   admin.get("/users", UserController.dashboard);
// });


// if custom route create define here like
// const routeName = require('./routeName');
// router.use('',routeName);

module.exports = router;
