// utils/groupRoutes.js
const express = require('express')
const GroupRoutes = (router, middleware, callback) => {
    const groupedRouter = express.Router();
    callback(groupedRouter);
    router.use(middleware, groupedRouter);
}
module.exports = GroupRoutes;