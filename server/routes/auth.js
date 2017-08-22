const router = require('express').Router()
const OAuth = require('oauth').OAuth

const User = require('./../models/user')
const Poll = require('./../models/poll')
const CONFIG = require('./../config')
const my = require('./../helper')
const CustomError = my.CustomError

// ****************************************************************************************************
//                                                TWITTER LOGIN
// ****************************************************************************************************
// https://gist.github.com/JuanJo4/e408d9349b403523aeb00f262900e768 for Oauth/Twitter reference
let oa = new OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  CONFIG.TWITTER_CONSUMER_KEY,
  CONFIG.TWITTER_CONSUMER_SECRET,
  '1.0A',
  CONFIG.CALLBACK_URL,
  'HMAC-SHA1'
)

const successRedirectUrl = CONFIG.successRedirectUrl || 'http://google.ca'
const failureRedirectUrl = CONFIG.failureRedirectUrl || 'http://youtube.com'

// Getting Request Token + Secret
router.get('/twitter/:id?', connectCheck, getOauthToken)

function connectCheck (req, res, next) {
  if (req.params.id) {
    User.findById(req.params.id).exec()
      .then(user => {
        if (user.twitter && user.twitter.id) {
          throw new CustomError('An existing Twitter account is already associated', 403)
        }
        req.session.connect = user
      })
      .catch(err => {
        return next(err)
      })
  }
  next()
}

function getOauthToken (req, res, next) {
  oa.getOAuthRequestToken((err, oauthToken, oauthTokenSecret, result) => {
    if (err) {
      res.session.error = err
      console.error('Error getting OAuth request token')
      res.redirect(failureRedirectUrl)
      return
    }
    const authorize = req.session.oauthAccessToken ? 'authenticate' : 'authorize'
    const userAuthorizeUrl = 'https://api.twitter.com/oauth/' + authorize + '?oauth_token='

    req.session.oauthRequestToken = oauthToken
    req.session.oauthRequestTokenSecret = oauthTokenSecret
    res.redirect(userAuthorizeUrl + oauthToken)
  })
}

// Getting Access Token + Secret => Finding/Making User
router.get('/callback', handleTwitterCallback, getFullProfile)

function handleTwitterCallback (req, res, next) {
  const oauthRequestToken = req.session.oauthRequestToken
  const oauthRequestTokenSecret = req.session.oauthRequestTokenSecret
  const oauthVerifier = req.query.oauth_verifier

  if (!req.query.oauth_verifier) {
    console.error('Authorization Request denied')
    res.redirect(successRedirectUrl)
    return
  }

  oa.getOAuthAccessToken(oauthRequestToken, oauthRequestTokenSecret, oauthVerifier,
    (err, oauthAccessToken, oauthAccessTokenSecret, result) => {
      if (err) {
        console.error('Error getting OAuth access token')
        req.session.error = err
        res.redirect(failureRedirectUrl)
        return
      }

      delete req.session.oauthRequestToken
      delete req.session.oauthRequestTokenSecret

      req.session.oauthAccessToken = oauthAccessToken
      req.session.oauthAccessTokenSecret = oauthAccessTokenSecret
      User.findOne({ 'twitter.id': result.user_id }).exec()
        .then(user => {
          if (!user) {
            return 'next'
          }
          if (req.session.connect) {
            if (user.local.email) {
              throw new CustomError('Twitter Account is already associated with another user', 403)
            }
            req.oldUserID = user._id
            return connectTwitterUser(req.session.connect, user)
          }
          return user
        })
        .then(user => {
          if (user === 'next') {
            return 'next'
          }
          req.session.user = user
          if (req.session.connect) {
            delete req.session.connect
            const update = { $set: { owner: user._id } }
            return Poll.update({ owner: req.oldUserID }, update, { multi: true }).exec()
          }
        })
        .then(result => {
          if (req.oldUserID) {
            return User.findByIdAndRemove(req.oldUserID).exec()
          }
          if (result === 'next') {
            return 'next'
          }
        })
        .then(result => {
          if (result === 'next') {
            return next()
          }
          return successRedirect(req, res)
        })
        .catch(err => {
          req.session.err = err
          return res.redirect(failureRedirectUrl)
        })
    })
}

function getFullProfile (req, res) {
  const verifyUrl = 'https://api.twitter.com/1.1/account/verify_credentials.json'
  const oauthAccessToken = req.session.oauthAccessToken
  const oauthAccessTokenSecret = req.session.oauthAccessTokenSecret

  oa.get(verifyUrl, oauthAccessToken, oauthAccessTokenSecret, (err, jsonData, response) => {
    if (err) {
      console.error('Error getting full profile from twitter: ' + err.message)
      req.session.error = err
      res.redirect(failureRedirectUrl)
      return
    }

    const data = JSON.parse(jsonData)
    const profile = {
      username: '@' + data.screen_name,
      twitter: {
        id: data.id,
        // token: oauthAccessToken,
        // tokenSecret: oauthAccessTokenSecret
        displayName: data.name
      }
    }
    // TODO: kinda hacky way to start the promise chain?
    Promise.resolve(profile)
      .then(profile => {
        // If Connecting to another account
        if (req.session.connect) {
          // associate twitter info to user in stored req.session.connect
          return connectTwitterUser(req.session.connect, profile)
        }
        const newUser = makeNewTwitterUser(profile)
        return newUser.save()
      })
      .then(user => {
        delete req.session.connect
        req.session.user = user
        return successRedirect(req, res)
      })
      .catch(err => {
        req.session.error = err
        return res.redirect(failureRedirectUrl)
      })
  })
}

function successRedirect (req, res) {
  res.redirect(successRedirectUrl)
}

// Route for client to call to get user after twitter login
router.get('/get-user', getUser, my.sendToken)

function getUser (req, res, next) {
  if (req.session.user) {
    req.user = req.session.user
    delete req.session.user
    return next()
  } else {
    return next(new CustomError('No User Found', 404))
  }
}

// Twitter disconnect route
router.get('/disconnect-twitter', my.verifyToken, my.UserGuard, disconnectTwitter, my.sendToken)

function disconnectTwitter (req, res, next) {
  const user = req.user
  delete req.session.oauthAccessToken
  delete req.session.oauthAccessTokenSecret
  User.findByIdAndUpdate(user._id, { $unset: { twitter: '' } }, { new: true }).exec()
    .then(user => {
      req.user = user
      return next()
    })
    .catch(err => {
      return next(err)
    })
}

// Twitter my Functions
function makeNewTwitterUser (profile) {
  let newUser = new User()
  newUser.username = profile.username
  newUser.twitter.id = profile.twitter.id
  // newUser.twitter.token = profile.twitter.token
  // newUser.twitter.tokenSecret = profile.twitter.tokenSecret
  newUser.twitter.displayName = profile.twitter.displayName
  // NOTE: empty objects are not currently saved
  newUser.local = {}
  newUser.profile = {}
  newUser.role = 'guest'
  return newUser
}

function connectTwitterUser (existingUser, twitterUser) {
  const updateInfo = { $set: { twitter: twitterUser.twitter } }
  return User.findByIdAndUpdate(existingUser._id, updateInfo, { new: true }).exec()
}

// ****************************************************************************************************
//                                          LOCAL LOGIN
// ****************************************************************************************************

router.post('/local/signup', LocalSignUp)

function LocalSignUp (req, res, next) {
  const username = req.body.username
  const email = req.body.email ? req.body.email.toLowerCase() : ''
  const password = req.body.password

  // Check if login info is valid
  // TODO: repeat validation checks from client side?
  if (!username || !email || !password) {
    return next(new CustomError('Missing or Invalid User Information', 400))
  }
  User.find({ $or: [{ 'username': username }, { 'local.email': email }] }).exec()
    .then(users => {
      if (users.length) {
        let message = makeDupeMessage(users, username, email) + ' already in use'
        throw new CustomError(message, 409)
      }
      // If connecting to another user
      const baseUser = req.user || new User()
      const newUser = connectLocalUser(username, email, password, baseUser)
      req.user = newUser
      return newUser.save()
    })
    .then(user => {
      return my.sendToken(req, res)
    })
    .catch(err => {
      return next(err)
    })
}

router.post('/local/login', LocalLogin)

function LocalLogin (req, res, next) {
  const username = req.body.username
  const email = req.body.email ? req.body.email.toLowerCase() : ''
  const password = req.body.password

  // Check if login info is valid
  if (!(username || email) || !password) {
    console.error('values not valid')
    return next(new CustomError('Missing or Invalid User Information', 400))
  }
  // Setup query
  const query = { 'local.email': email }
  // NOTE: Currently the client only accepts email so this is doesn't do anything
  // if (username.indexOf('@') < 0) {
  //   query = { username: username }
  // } else {
  //   query = { 'local.email': username }
  // }
  User.findOne(query).exec()
    .then(user => {
      if (!user) {
        throw new CustomError('No User Found', 404)
      }
      if (!user.verifyPassword(password)) {
        throw new CustomError('Wrong Password', 401)
      }
      // If connecting to another account
      if (req.user) {
        const existingUser = req.user
        const updateInfo = {
          $set: {
            username: user.username,
            local: {
              email: user.local.email,
              password: user.local.password
            },
            role: CONFIG.admins.indexOf(email) > -1 ? 'admin' : 'member'
          }
        }
        req.oldUserID = user._id
        return User.findByIdAndUpdate(existingUser._id, updateInfo, { new: true }).exec()
      } else {
        req.user = user
      }
    })
    .then(updatedUser => {
      if (req.oldUserID) {
        req.user = updatedUser
        const update = { $set: { owner: updatedUser._id } }
        return Poll.update({ owner: req.oldUserID }, update, { multi: true }).exec()
      }
    })
    .then(result => {
      if (req.oldUserID) {
        return User.findByIdAndRemove(req.oldUserID).exec()
      }
    })
    .then(result => {
      return my.sendToken(req, res)
    })
    .catch(err => {
      return next(err)
    })
}

router.post('/connect-local', my.verifyToken, my.UserGuard, CheckLocalType)

function CheckLocalType (req, res, next) {
  if (req.user.local.email) {
    next(new CustomError('Account already has a local account associated with it', 403))
  }

  const username = req.body.username
  const email = req.body.email ? req.body.email.toLowerCase() : ''
  // const password = req.body.password

  // TODO: double check values to make sure they are valid even though the client should do this?
  // if (!(username || email) || !password) {
  //   return next(new CustomError('Missing or Invalid User Information', 400))
  // }
  if (username && email) {
    return LocalSignUp(req, res, next)
  }
  return LocalLogin(req, res, next)
}

function connectLocalUser (username, email, password, baseUser) {
  baseUser.username = username
  baseUser.local = {
    email: email,
    password: baseUser.generateHash(password)
  }
  // NOTE: empty objects are not currently saved
  baseUser.profile = baseUser.profile || {}
  baseUser.twitter = baseUser.twitter || {}
  baseUser.role = CONFIG.admins.indexOf(email) > -1 ? 'admin' : 'member'
  return baseUser
}

// Local Disconnect
// NOTE: Shouldn't really use this
router.get('/disconnect-local', my.verifyToken, my.UserGuard, disconnectLocal, my.sendToken)

function disconnectLocal (req, res, next) {
  const user = req.user
    // TODO: change role as well from member => guest?
  const updateInfo = {
    $unset: {
      local: ''
    }
  }
  User.findByIdAndUpdate(user._id, updateInfo, { new: true }).exec()
    .then(updatedUser => {
      req.user = updatedUser
      return next()
    })
    .catch(err => {
      return next(err)
    })
}

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

// CHECK FOR SIGNUP ASYNC VALIDATION
router.post('/local/existingCheck', dupeCheck)

function dupeCheck (req, res, next) {
  const field = req.body.field
  const query = {}
  if (field.indexOf('@') > -1) {
    query['local.email'] = field
  } else {
    query.username = field
  }

  User.findOne(query).exec()
    .then(user => {
      if (user) {
        throw new CustomError('Existing Entry Found', 409)
      } else {
        res.json({ message: 'Valid' })
      }
    })
    .catch(err => {
      return next(err)
    })
}

// ****************************************************************************************************
//                                                    JWT LOGIN
// ****************************************************************************************************

router.get('/jwt/login', my.verifyToken, my.UserGuard, my.sendToken)

// ****************************************************************************************************
//                                                ADMIN ONLY PATHS
// ****************************************************************************************************

// ADMIN ONLY PATH
router.get('/admin', my.verifyToken, my.AdminGuard, (req, res) => {
  res.json({ message: 'Welcome Admin' })
})

module.exports = router
