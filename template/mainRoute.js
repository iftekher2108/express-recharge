const express = require('express');
const router = express.Router();

// const limiter = require('@middleware/rateLimiter');
// const Auth = require('@middleware/Auth');


// rate-limit set global
// app.use(limiter)



// app.use("/api/v1", (req, res, next) => {
//   console.log("API v1 route accessed");
//   next();
// });

// middleware
// app.use(middleware)


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
