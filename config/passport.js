const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')
module.exports = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      (req, email, password, done) => {
        User.findOne({ email })
          .then((user) => {
            if (!user) {
              req.flash('warning_msg', 'That email is not registered')
              return done(null, false, {
                message: 'That email is not registered',
              })
            }
            return bcrypt.compare(password, user.password).then((isMatched) => {
              if (!isMatched) {
                return done(
                  null,
                  false,
                  req.flash('warning_msg', 'Email or password incorrect')
                )
              }
              return done(null, user)
            })
          })
          .catch((err) => done(err, false))
      }
    )
  )
  passport.serializeUser((user, done) => {
    done(null, user)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null))
  })
}
