const express = require("express");
const router = express.Router();
const {{moduleName}}Controller = require("@modules/{{moduleName}}/controller/{{moduleName}}Controller");
const upload = require("@utils/file_system");


// router.get("/{{moduleName}}", Controller.index);


module.exports = router ;
