const express = require('express')
const app = express()
const ephbs = require('express-handlebars')
const methodOverride = require('method-override')
const Restaurant = require('./models/restaurant')
const routes = require('./routes')
require('./config/mongoose')
//設定 express 裡的引擎、畫面、解析
app.engine('hbs', ephbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(routes)

//監聽 web server
app.listen(3000, () => {
  console.log('web server is activated')
})
