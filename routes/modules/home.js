const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const Helper = require('../../public/javascripts/helper')

//首頁路由
router.get('/', (req, res) => {
  const sortBy = 'asc'
  Restaurant.find()
    .lean()
    .sort({ name: sortBy })
    .then((restaurant) => res.render('index', { restaurant, sortBy }))
    .catch((error) => console.log(error))
})

router.put('/', (req, res) => {
  const sortBy = req.body.sort
  const sortMethod = {
    asc: { name: 'asc' },
    desc: { name: 'desc' },
    category: { category: 'asc' },
    location: { location: 'asc' },
  }
  Restaurant.find()
    .lean()
    .sort(sortMethod[sortBy])
    .then((restaurant) => res.render('index', { restaurant, sortBy }))
})
module.exports = router
