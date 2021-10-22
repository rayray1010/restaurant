const express = require('express')
const app = express()
const ephbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
const session = require('express-session')
const userPassport = require('./config/passport')
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
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true,
  })
)
userPassport(app)
app.use(routes)

//監聽 web server
app.listen(3000, () => {
  console.log('web server is activated')
})
