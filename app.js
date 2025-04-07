const express =require('express')
const app = express();
const cors = require('cors')
const samRoute = require('./Users/routes/routes')

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(cors({
    origin:'*'
}))

app.use('/',samRoute)



module.exports = app
