const express =require('express')
const app = express();
const cors = require('cors')
const samRoute = require('./Users/routes/routes')

// database
const db = require('./Config/database')

db.sync({ alter: true }).then(() => {
    console.log('Database synced!');
  }).catch(err => {
    console.error('Database sync failed:', err);
  });

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(cors({
    origin:'*'
}))

app.use('/',samRoute)



module.exports = app
