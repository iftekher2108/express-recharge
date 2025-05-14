const { DataTypes, Model } = require("sequelize");
const sequelize = require("@config/database");


class User extends Model {
  // your can write logic function get set
}

User.init(
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
    sequelize,
    modelName:"user",
    paranoid: true,
  }

);


module.exports = User;
