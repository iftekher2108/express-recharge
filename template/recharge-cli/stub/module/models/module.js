const { DataTypes, Model } = require("sequelize");
const sequelize = require("@config/database");



class {{moduleName}} extends Model {
  // your can write logic function get set
}

{{moduleName}}.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    
  },
  {
    sequelize,
    modelName:"{{moduleName}}",
    paranoid: true,
  }
);

module.exports = {{moduleName}} ;
