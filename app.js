const express =require('express')
const app = express();
const cors = require('cors')
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
app.use(cors({
    origin:'*'
}))


// database
const db = require('./Config/database')

// database init
db.sync({ alter: true }).then(() => {
    console.log('Database synced!');
  }).catch(err => {
    console.error('Database sync failed:', err);
  });


// modular
const samRoute = require('./Users/routes/routes')

// modolar routes
app.use('/',samRoute)



// middleware
// app.use(middleware)




module.exports = app
