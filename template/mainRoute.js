const express = require('express');
const router = express.Router();

/**
 * module route
 */
const userRoute = require('@module/Users/Routes/routes');

/**
 * module register
 *
 * @type {*}
 */
router.use('/',userRoute);



module.exports = router;
