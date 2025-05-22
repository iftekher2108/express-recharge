// utils/groupRoutes.js
const express = require("express");
/**
 * Group routes under a specific middleware
 * @param {Object} router - The main router object
 * @param {Function} middleware - The middleware to apply to the grouped routes
 * @param {Function} callback - A function that takes the grouped router as an argument
 */
const GroupRoute = (router, middleware, callback) => {
  const groupedRouter = express.Router();
  callback(groupedRouter);
  router.use(middleware, groupedRouter);
};
module.exports = GroupRoute;
