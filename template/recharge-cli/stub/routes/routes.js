const express = require("express");
const router = express.Router();
const UserController = require("@modules/Users/controller/UserController");
const upload = require("@utils/file_system");

router.get("/", (req, res) => {
  res.json({ msg: "Welcome to the API System" });
});





module.exports = router;
