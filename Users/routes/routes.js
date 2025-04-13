const express = require('express')
const router = express.Router()
const limiter = require('../../Config/rate-limiter')
const UserController = require('../controller/UserController')

router.post('/user',UserController.user_store)
router.get('/user',limiter,UserController.user_get)
router.delete('/user/:id',UserController.user_delete)
router.post('/one-milion',UserController.one_milion)
router.post('/one-hundred',UserController.one_hundred)
router.get('/user-list',UserController.user_list)



module.exports = router