var TwitterStrategy = require('passport-twitter').Strategy
var LocalStrategy = require('passport-local').Strategy
const CONFIG = require('./config')
const passport = require('passport')

var User = require('./models/user')
// Used https://scotch.io/tutorials/easy-node-authentication-twitter as a reference

// TODO: Better name for error
function CustomError (message, status, name) {
  Error.captureStackTrace(this, name || this.constructor)

  this.name = this.constructor.name
  this.message = message || 'Something went wrong.'
  this.status = status || 500
}

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

const TwitterLogin = new TwitterStrategy({
  'consumerKey': CONFIG.TWITTER_CONSUMER_KEY,
  'consumerSecret': CONFIG.TWITTER_CONSUMER_SECRET,
  'callbackURL': CONFIG.CALLBACK_URL,
  passReqToCallback: true
}, (req, token, tokenSecret, profile, done) => {
  // if (!req.user) {
    console.log('No User')
    // No user logged in => not connecting accounts
    User.findOne({ 'twitter.id': profile.id }).exec()
      .then(user => {
        if (!user) {
          // No record of user, make new user
          const newUser = new User()
          newUser.profile = {}
          newUser.username = '@' + profile.screen_name
          newUser.twitter.id = profile.id
          newUser.role = 'guest'
          // newUser.twitter.token = token
          // newUser.twitter.tokenSecert = tokenSecret
          newUser.twitter.displayName = profile.displayName
          return newUser.save()
        }
        // Existing User found, update displayName
        user.twitter.displayName = profile.displayName
        return user.save()
      })
      .then(newUser => {
        return done(null, newUser)
      })
      .catch(err => {
        return done(err)
      })
  // } else {
  //   console.log('Connecting: ' + req.user.username)
  //   // User logged in => Connect twitter info
  //   if (req.user.twitter.id) {
  //     // User already has a twitter account associate with it
  //     throw new CustomError('User already has Twitter account connected', 409)
  //   }
  //   User.findById(req.user._id).exec()
  //     .then(user => {
  //       // Associate Twitter info with existing user
  //       user.twitter.id = profile.id
  //       // user.twitter.token = token
  //       // user.twitter.tokenSecert = tokenSecret
  //       user.twitter.displayName = profile.displayName
  //       return user.save()
  //     })
  //     .then(updatedUser => {
  //       const id = req.user._id
  //       req.user = updatedUser
  //       return User.findByIdAndRemove(id).exec()
  //     })
  //     .then(user => {
  //       user = req.user
  //       return done(null, user)
  //     })
  //     .catch(err => {
  //       return done(err)
  //     })
  // }
})

const TwitterConnect = new TwitterStrategy({
  'consumerKey': CONFIG.TWITTER_CONSUMER_KEY,
  'consumerSecret': CONFIG.TWITTER_CONSUMER_SECRET,
  'callbackURL': CONFIG.CALLBACK_URL + '/connect',
  passReqToCallback: true
}, (req, token, tokenSecret, profile, done) => {
  console.log('Connecting: ' + req.user.username)
  // User logged in => Connect twitter info
  if (req.user.twitter.id) {
    // User already has a twitter account associate with it
    throw new CustomError('User already has Twitter account connected', 409)
  }
  User.findById(req.user._id).exec()
    .then(user => {
      // Associate Twitter info with existing user
      user.twitter.id = profile.id
      // user.twitter.token = token
      // user.twitter.tokenSecert = tokenSecret
      user.twitter.displayName = profile.displayName
      return user.save()
    })
    .then(updatedUser => {
      const id = req.user._id
      req.user = updatedUser
      return User.findByIdAndRemove(id).exec()
    })
    .then(user => {
      user = req.user
      return done(null, user)
    })
    .catch(err => {
      return done(err)
    })
})

const LocalLogin = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: true
}, (req, email, password, done) => {
  email = email.toLowerCase()
  // const username = req.body.username

  // TODO: Validate info again?

  User.findOne({ 'local.email': email }).exec()
    .then(localUser => {
      if (!localUser) {
        throw new CustomError('Email not found', 404)
      }
      if (!localUser.verifyPassword(password)) {
        throw new CustomError('Wrong Password', 401)
      }
      req.localUser = localUser
      if (!req.user) {
        // No user logged in => not connecting
        req.skip = true
        return Promise.resolve(localUser)
      } else {
        // User logged in => connect info
        if (req.user.local.email) {
          throw new CustomError('User already has local account connected', 409)
        }
        return User.findById(req.user._id)
      }
    })
    .then(user => {
      if (req.skip) {
        // Not connecting to another account
        return Promise.resolve(user)
      }
      // Updated from default Twitter name to given local name
      user.username = req.localUser.username
      user.local.email = req.localUser.email
      user.local.password = user.verifyPassword(password)
      user.role = CONFIG.admins.indexOf(email) > -1 ? 'admin' : 'member'
      return user.save()
    })
    .then(user => {
      return done(null, user)
    })
    .catch(err => {
      return done(err)
    })
})

const LocalSignUp = new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
  session: true
}, (req, username, password, done) => {
  const email = req.body.email ? req.body.email.toLowerCase() : ''

  // TODO: Validate info again?

  User.find({ $or: [{ 'username': username }, { 'local.email': email }] }).exec()
    .then(users => {
      if (users.length) {
        let message = makeDupeMessage(users, username, email) + ' already in use'
        throw new CustomError(message, 409)
      }
      // If connecting to another user
      if (req.user && req.user.local) {
        throw new CustomError('User already has local account connected', 409)
      }
      const baseUser = req.user || new User()
      const newUser = connectLocalUser(username, email, password, baseUser)
      req.user = newUser
      return newUser.save()
    })
    .then(user => {
      return done(null, user)
    })
    .catch(err => {
      return done(err)
    })
})

passport.use('twitter-login', TwitterLogin)
passport.use('twitter-connect', TwitterConnect)
passport.use('local-login', LocalLogin)
passport.use('local-signup', LocalSignUp)

function makeDupeMessage (users, username, email) {
  const errors = []
  users.forEach(user => {
    if (user.username === username) {
      errors.push('Username')
    }
    if (user.local.email === email) {
      errors.push('Email')
    }
  })
  return errors.join(' and ')
}

function connectLocalUser (username, email, password, baseUser) {
  baseUser.username = username
  baseUser.local = {
    email: email,
    password: baseUser.generateHash(password)
  }
  // baseUser.markModified('local.email')
  // baseUser.markModified('local.password')
  // NOTE: empty objects are not currently saved
  baseUser.profile = baseUser.profile || {}
  baseUser.twitter = baseUser.twitter || {}
  baseUser.role = CONFIG.admins.indexOf(email) > -1 ? 'admin' : 'member'
  return baseUser
}
