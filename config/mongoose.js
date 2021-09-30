const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant')
const db = mongoose.connection
db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db is activated')
})

module.exports = db
