const { DataTypes, TableHints } = require("sequelize");
const db = require("@config/database");

const User = db.define(
  "user",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "name field is required",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "email field is not valid",
        },
        notNull: {
          msg: "email field is required",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password field is required",
        },
        len: {
          args: [8, 64],
          msg: "password field must be between 8 and 64 characters",
        },
      },
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
// (which columns it has, what are their data types), and then
// performs the necessary changes in the table to make it match the model.
// User.sync({ alter: true }).then(() => {
//     console.log('User model altered successfully!')
// }) .catch((err) => {
//     console.error("User sync failed:", err);
// });

// This creates the table, dropping it first if it already existed
// User.sync({ force: true })
//   .then(() => {
//     console.log("User model force-fully Created successfully!");
//   })
//   .catch((err) => {
//     console.error("User sync failed:", err);
//   });

// // User model table drop with all Data
// User.drop().then(() => {
//     console.log('User model dropped!')
// }) .catch((err) => {
//     console.error("User sync failed:", err);
// });

module.exports = User;
