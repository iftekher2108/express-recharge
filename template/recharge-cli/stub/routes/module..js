const express = require("express");
const router = express.Router();


// Import the controller

router.get("/example", (req, res) => {
  res.send("Example route");
});

