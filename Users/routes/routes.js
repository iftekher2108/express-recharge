const express = require('express')
const router = express.Router()

const UserController = require('../controller/UserController')

router.post('/user',UserController.user_store)
router.get('/user',UserController.user_get)
router.delete('/user/:id',UserController.user_delete)




module.exports = router