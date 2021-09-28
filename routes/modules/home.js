const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//首頁路由
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurant) => res.render('index', { restaurant }))
    .catch((error) => console.log(error))
})

module.exports = router
