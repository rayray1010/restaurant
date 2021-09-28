const express = require('express')
const app = express()
const mongoose = require('mongoose')
const ephbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const restaurant = require('./models/restaurant')

//設定mongoose 去連 database
mongoose.connect('mongodb://localhost/a5')
const db = mongoose.connection
db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db is activated')
})

//設定 express 裡的引擎、畫面、解析
app.engine('hbs', ephbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//首頁路由
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurant) => res.render('index', { restaurant }))
    .catch((error) => console.log(error))
})

//detail 頁面路由
app.get('/restaurant/:id/detail', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
})
//新增之路由
app.get('/restaurant/create', (req, res) => {
  res.render('new')
})
// 新增表單 post 路由
app.post('/restaurant/create', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})
// 刪除一筆資料路由
app.post('/restaurant/:id/delete', (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})
//編輯頁面路由
app.get('/restaurant/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
})
//編輯表單送出路由
app.post('/restaurant/:id/edit', (req, res) => {
  const id = req.params.id
  const editedItem = req.body
  Restaurant.findByIdAndUpdate(id, editedItem)
    .then(() => res.redirect(`/restaurant/${id}/detail`))
    .catch((err) => console.log(err))
})
//搜尋路由
app.get('/restaurant/search', (req, res) => {
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

//監聽 web server
app.listen(3000, () => {
  console.log('web server is activated')
})
