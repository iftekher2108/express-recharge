const { DataTypes } = require("sequelize");
const db = require("@config/database");

const {{moduleName}} = db.define(
  "{{moduleName}}",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    
  },
  {
    paranoid: true,
  }
);

// This creates the table if it doesn't exist
// (and does nothing if it already exists)
{{moduleName}}.sync()
  .then(() => {
    console.log("{{moduleName}} Model init successfully!");
  })
  .catch((err) => {
    console.error("{{moduleName}} sync failed:", err);
  });


//  This checks what is the current state of the table in the database
// (which columns it has, what are their data types, etc), and then
// performs the necessary changes in the table to make it match the model.
// {{moduleName}}.sync({ alter: true }).then(() => {
//     console.log(`{{moduleName}} model altered successfully!`)
// }) .catch((err) => {
//     console.error(`{{moduleName}} sync failed:`, err);
// });

// This creates the table, dropping it first if it already existed
// {{moduleName}}.sync({ force: true }).then(() => {
//     console.log(`{{moduleName}} model force-fully Created successfully!`)
// }) .catch((err) => {
//     console.error(`{{moduleName}} sync failed:`, err);
// });

// // {{moduleName}} model table drop with all Data
// {{moduleName}}.drop().then(() => {
//     console.log(`{{moduleName}} model dropped!`)
// }) .catch((err) => {
//     console.error(`{{moduleName}} sync failed:`, err);
// });

module.exports = {{moduleName}} ;
