const express = require("express");
const router = express.Router();
const {{moduleName}} = require("@middlewares/{{moduleName}}");
const {{moduleName}}Controller = require("@modules/{{moduleName}}/Controllers/{{moduleName}}Controller");
const upload = require("@utils/fileUpload");

// router.get("/{{moduleName}}", {{moduleName}}Controller.index);


module.exports = router ;
