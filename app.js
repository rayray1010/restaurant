if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const ephbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
const session = require('express-session')
const userPassport = require('./config/passport')
const flash = require('connect-flash')
require('./config/mongoose')

//設定 express 裡的引擎、畫面、解析
app.engine(
  'hbs',
  ephbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
      isMatched(a, b) {
        if (a === b) return 'selected'
      },
    },
  })
)
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
userPassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)

//監聽 web server
app.listen(process.env.PORT, () => {
  console.log('web server is activated')
})
