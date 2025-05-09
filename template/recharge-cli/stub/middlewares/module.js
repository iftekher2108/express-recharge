
const {{moduleName}} = (req, res, next) => {
  console.log(`Module Name: ${req.moduleName}`);
  next();
}

module.exports = {{moduleName}};