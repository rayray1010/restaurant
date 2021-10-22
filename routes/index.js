const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const users = require('./modules/users')
const restaurant = require('./modules/restaurant')

router.use('/users', users)
router.use('/restaurant', restaurant)
router.use('/', home)
module.exports = router
