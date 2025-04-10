const { DataTypes } = require('sequelize')
const db = require('../../Config/database')

const User = db.define('users',{
    id:{
        type:DataTypes.BIGINT,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull: {
                msg:'name field is required'
            },
            // isAlpha:{
            //     msg:'name field is only letters'
            // },
        }
        
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false,

    }
},{
    paranoid:true
}
)

module.exports = User
