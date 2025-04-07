const express = require('express')
const router = express.Router()

const simple = require('../controller/controller')

router.get('/:id',simple.home)
router.get('/about',simple.about)


module.exports = router