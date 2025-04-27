require('dotenv').config()
const { Sequelize } = require('sequelize')

// MYSQL CONNECTION using sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DB_CONNECTION,
    logging: process.env.APP_ENV === 'development' ? true : process.env.APP_ENV === 'production' ? false : false,
});

// Option 2: Passing parameters separately (sqlite)
// Note: When it use frist Connection need to comment
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: 'path/to/database.sqlite'
//   });



module.exports = sequelize

