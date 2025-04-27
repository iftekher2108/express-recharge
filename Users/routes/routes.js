const express = require('express')
const router = express.Router()
const limiter = require('../../Config/rate-limiter')
const UserController = require('../controller/UserController')
const Auth = require('../../Middleware/Auth')
const  groupRoutes = require('../../utils/GroupRoutes')

router.post('/user',UserController.user_store)
router.get('/user',limiter,UserController.user_get)
router.delete('/user/:id',UserController.user_delete)
router.post('/one-milion',UserController.one_milion)
router.post('/one-hundred',UserController.one_hundred)
router.get('/user-list',UserController.user_list)

router.post('/login',UserController.login)
router.post('/register',UserController.register)

groupRoutes(router,Auth,(admin) => {
    admin.get('/dashboard',UserController.dashboard)
    admin.get('/post',UserController.post) 
})



module.exports = router