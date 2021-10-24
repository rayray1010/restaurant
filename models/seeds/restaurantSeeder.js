const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '1234',
    restaurantIndex: [0, 1, 2],
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '1234',
    restaurantIndex: [3, 4, 5],
  },
]
db.once('open', () => {
  Promise.all(
    Array.from(SEED_USER, (seedUser) => {
      bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(seedUser.password, salt))
        .then((hash) =>
          User.create({
            name: seedUser.name,
            email: seedUser.email,
            password: hash,
          })
        )
        .then((user) => {
          const userID = user._id
          let restaurant = []
          seedUser.restaurantIndex.forEach((index) => {
            restaurantList[index].userID = userID
            restaurant.push(restaurantList[index])
          })
          return Restaurant.create(restaurant)
        })
    })
  )
    .then(() => {
      console.log('done')
    })
    .catch((err) => console.log(err))
})
