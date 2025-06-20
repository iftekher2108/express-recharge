const express = require("express");
const {{ moduleName }} = express.Router();


// Import the controller

{{ moduleName }}.get("/example", (req, res) => {
  res.send("Example route");
});

module.exports = {{ moduleName }}

