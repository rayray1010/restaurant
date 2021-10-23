const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//首頁路由
router.get('/', (req, res) => {
  const userID = req.user._id
  let { sort, category, rating } = req.query
  const sortMethod = {
    asc: { name: 'asc' },
    desc: { name: 'desc' },
    category: { category: 'asc' },
    location: { location: 'asc' },
  }

  if (sort || category || rating) {
    Restaurant.find({
      $and: [
        { userID },
        { category: { $regex: String(category), $options: 'i' } },
        { rating: { $gte: rating } },
      ],
    })
      .sort(sortMethod[sort])
      .lean()
      .then((restaurant) => {
        res.render('index', { restaurant, sort, category, rating })
      })
      .catch((error) => console.log(error))
  } else {
    Restaurant.find({ userID })
      .lean()
      .then((restaurant) => res.render('index', { restaurant }))
      .catch((err) => console.log(err))
  }
})

module.exports = router
