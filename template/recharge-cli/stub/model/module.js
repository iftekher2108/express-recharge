const { DataTypes } = require("sequelize");
const db = require("@config/database");

const User = db.define(
  "users",
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
User.sync()
  .then(() => {
    console.log("User Model init successfully!");
  })
  .catch((err) => {
    console.error("User sync failed:", err);
  });


//  This checks what is the current state of the table in the database
// (which columns it has, what are their data types, etc), and then
// performs the necessary changes in the table to make it match the model.
// User.sync({ alter: true }).then(() => {
//     console.log('User model altered successfully!')
// }) .catch((err) => {
//     console.error("User sync failed:", err);
// });

// This creates the table, dropping it first if it already existed
// User.sync({ force: true }).then(() => {
//     console.log('User model force-fully Created successfully!')
// }) .catch((err) => {
//     console.error("User sync failed:", err);
// });

// // User model table drop with all Data
// User.drop().then(() => {
//     console.log('User model dropped!')
// }) .catch((err) => {
//     console.error("User sync failed:", err);
// });

module.exports = User;
