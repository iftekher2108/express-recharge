const express = require('express')
const router = express.Router()
const limiter = require('../../Config/rate-limiter')
const UserController = require('../controller/UserController')
const Auth = require('../../Middleware/Auth')
const  groupRoutes = require('../../utils/group_routes')


router.get('/',(req,res) => {
    res.json({msg:'Welcome to the API System'})
})

router.post('/login',UserController.login)
router.post('/register',UserController.register)

router.post('/user',UserController.user_store)
router.get('/user',limiter,UserController.user_get)
router.delete('/user/:id',UserController.user_delete)

router.get('/pdfgenerate',UserController.pdfgenerate)



// middleware before after piority matters
groupRoutes(router,Auth,(admin) => {
    admin.get('/dashboard',UserController.dashboard)
    admin.get('/post',UserController.post) 
})



module.exports = router