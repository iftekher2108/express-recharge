const { DataTypes } = require('sequelize')
const db = require('../../Config/database')

const User = db.define('users',{
    name:{
        type: DataTypes.STRING,
        
    }
})
