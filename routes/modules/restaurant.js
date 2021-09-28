const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 新增之路由
router.get('/restaurant/new', (req, res) => {
  res.render('new')
})

//新增表單 post 路由
router.post('/restaurant/new', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

//detail 頁面路由
router.get('/restaurant/:id/detail', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
})

//刪除一筆資料路由
router.delete('/restaurant/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})
//編輯頁面路由
router.get('/restaurant/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
})
//編輯表單送出路由
router.put('/restaurant/:id', (req, res) => {
  const id = req.params.id
  const editedItem = req.body
  Restaurant.findByIdAndUpdate(id, editedItem)
    .then(() => res.redirect(`/restaurant/${id}/detail`))
    .catch((err) => console.log(err))
})
//搜尋路由
router.get('/restaurant/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  Restaurant.find({
    $or: [
      { name: { $regex: keyword, $options: 'i' } },
      { category: { $regex: keyword, $options: 'i' } },
    ],
  })
    .lean()
    .then((restaurant) => res.render('index', { restaurant, keyword }))
    .catch((err) => console.log(err))
})

module.exports = router
