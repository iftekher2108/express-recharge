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
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          message: "name field is required",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          message: "email field is not valid",
        },
        notNull: {
          message: "email field is required",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          message: "password field is required",
        },
        len: {
          args: [8, 64],
          message: "password field must be between 8 and 64 characters",
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
