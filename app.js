const express =require('express')
const app = express();

// const limiter = require('./Config/rate-limiter')
// rate-limit set global
// app.use(limiter)


  // json allow
app.use(express.json())
// urlencoded allow
app.use(express.urlencoded({
    extended: true
}))


// cors allow
const cors = require('cors')
app.use(cors({
    origin:'*'
}))


// database
const db = require('./Config/database')

// database init
// db.sync({ alter: true }).then(() => {
//     console.log('Database synced!');
//   }).catch(err => {
//     console.error('Database sync failed:', err);
//   });



// modular
const userRoute = require('./Users/routes/routes')


// modular routes
app.use('/',userRoute)



// middleware
// app.use(middleware)




module.exports = app
