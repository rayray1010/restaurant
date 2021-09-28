const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
mongoose.connect('mongodb://localhost/a5')
const db = mongoose.connection
const restaurantList = require('../../restaurant.json')
db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  Restaurant.insertMany(restaurantList.results)
  console.log('db is activated')
})
