const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const users = require('./modules/users')
const restaurant = require('./modules/restaurant')
const { authenticator } = require('../middleware/auth')

router.use('/users', users)
router.use('/restaurant', authenticator, restaurant)
router.use('/', authenticator, home)
module.exports = router
