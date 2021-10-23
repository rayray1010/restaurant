const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 新增之路由
router.get('/new', (req, res) => {
  res.render('new')
})

//新增表單 post 路由
router.post('/new', (req, res) => {
  const userID = req.user._id
  const UserInfo = req.body
  UserInfo.userID = userID
  Restaurant.create(UserInfo)
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

//detail 頁面路由
router.get('/:id/detail', (req, res) => {
  const userID = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ _id, userID })
    .lean()
    .then((restaurant) => {
      res.render('detail', { restaurant })
    })
    .catch((err) => console.log(err))
})

//刪除一筆資料路由
router.delete('/:id', (req, res) => {
  const userID = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ _id, userID })
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})
//編輯頁面路由
router.get('/:id/edit', (req, res) => {
  const userID = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ _id, userID })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((err) => console.log(err))
})
//編輯表單送出路由
router.put('/:id', (req, res) => {
  const userID = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ _id, userID })
    .then((restaurant) => {
      Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})
//搜尋路由
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const userID = req.user._id
  Restaurant.find({
    $or: [
      { name: { $regex: keyword, $options: 'i' } },
      { category: { $regex: keyword, $options: 'i' } },
    ],
    userID,
  })
    .lean()
    .then((restaurant) => {
      res.render('index', { restaurant, keyword })
    })
    .catch((err) => console.log(err))
})
module.exports = router
