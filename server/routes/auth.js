const router = require('express').Router()
const OAuth = require('oauth').OAuth

const User = require('./../models/user')
const Poll = require('./../models/poll')
const CONFIG = require('./../config')
const my = require('./../helper')
const CustomError = my.CustomError

// TODO: update to account for Twitter authorization changes in october

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
router.get('/twitter/:id?', connectCheck, (req, res, next) => {
  if (req.session.oauthAccessToken) {
    return verifyCredentials(req, res, next)
  } else {
    return getOauthToken(req, res, next)
  }
})

function connectCheck (req, res, next) {
  if (!req.params.id) {
    return next()
  }
  User.findById(req.params.id).exec()
    .then(user => {
      if (user.twitter && user.twitter.id) {
        throw new CustomError('An existing Twitter account is already associated', 403)
      }
      req.session.connect = user
      return next()
    })
    .catch(err => {
      return next(err)
    })
}

function getOauthToken (req, res, next) {
  oa.getOAuthRequestToken((err, oauthToken, oauthTokenSecret, result) => {
    if (err) {
      res.session.error = err
      console.error('Error getting OAuth request token')
      res.redirect(failureRedirectUrl)
      return
    }
    const userAuthorizeUrl = 'https://api.twitter.com/oauth/authorize?oauth_token=' + oauthToken

    req.session.oauthRequestToken = oauthToken
    req.session.oauthRequestTokenSecret = oauthTokenSecret
    res.redirect(userAuthorizeUrl)
  })
}

// Getting Access Token + Secret => Finding/Making User
router.get('/callback', (req, res, next) => {
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
      req.twitterID = result.user_id
      return pullUserInfo(req, res)
    })
})

function pullUserInfo (req, res, next) {
  User.findOne({ 'twitter.id': req.twitterID }).exec()
    .then(user => {
      const newUser = !user
      if (newUser) {
        if (!req.profile) {
          // No User => Skipping ahead to getting full user info
          const skip = { getTwitterInfo: true }
          req.dbChecked = true
          throw skip
        }
        // user = req.profile
      }
      user = user || req.profile
      if (req.session.connect) {
        if (user.local.email) {
          throw new CustomError('Twitter Account is already associated with another user', 403)
        }
        req.oldUserID = user._id
        return connectTwitterUser(req.session.connect, user)
      }
      if (newUser) {
        return makeNewTwitterUser(user)
      }
      return user
    })
    .then(user => {
      req.session.user = user
      if (req.session.connect) {
        delete req.session.connect
        if (req.oldUserID) {
          // Updating polls associated with old userID with new userID
          const update = { $set: { owner: user._id } }
          return Poll.update({ owner: req.oldUserID }, update, { multi: true }).exec()
        }
      }
    })
    .then(updated => {
      if (req.oldUserID) {
        // Polls have been updated, removing old userID
        return User.findByIdAndRemove(req.oldUserID).exec()
      }
    })
    .then(removed => {
      return res.redirect(successRedirectUrl)
    })
    .catch(err => {
      if (err.getTwitterInfo) {
        return verifyCredentials(req, res, next)
      } else {
        req.session.err = err
        return res.redirect(failureRedirectUrl)
      }
    })
}

function verifyCredentials (req, res, next) {
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
        id: data.id_str,
        // token: oauthAccessToken,
        // tokenSecret: oauthAccessTokenSecret
        displayName: data.name
      }
    }
    req.profile = profile
    req.twitterID = data.id_str
    return pullUserInfo(req, res)
  })
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
router.get('/disconnect-twitter', my.verifyToken, my.UserGuard, disconnectTwitter)

function disconnectTwitter (req, res, next) {
  const user = req.user
  delete req.session.oauthAccessToken
  delete req.session.oauthAccessTokenSecret
  if (user.local && user.local.email) {
    User.findByIdAndUpdate(user._id, { $unset: { twitter: '' } }, { new: true })
      .then(user => {
        req.user = user
        return my.sendToken(req, res)
      })
      .catch(err => {
        return next(err)
      })
  } else {
    return res.json({ msg: 'logout' })
  }
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
  return newUser.save()
}

function connectTwitterUser (existingUser, twitterUser) {
  const updateInfo = { $set: { twitter: twitterUser.twitter } }
  return User.findByIdAndUpdate(existingUser._id, updateInfo, { new: true }).exec()
}

// ****************************************************************************************************
//                                          LOCAL LOGIN
// ****************************************************************************************************
// http://emailregex.com/
const emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const usernameRegExp = /[^a-zA-Z0-9]/

router.post('/local/signup', LocalSignUp)

function LocalSignUp (req, res, next) {
  const username = req.body.username
  const email = req.body.email ? req.body.email.toLowerCase() : ''
  const password = req.body.password

  // Check if login info is valid
  if (!username || !email || !password) {
    return next(new CustomError('Missing User Information', 400))
  }
  if (!emailRegExp.test(email)) {
    return next(new CustomError('Invalid Email', 400))
  }
  if (usernameRegExp.test(username)) {
    return next(new CustomError('Invalid Username', 400))
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
    return next(new CustomError('Missing User Information', 400))
  }
  if (!emailRegExp.test(email)) {
    return next(new CustomError('Invalid Email', 400))
  }
  // if (usernameRegExp.test(username)) {
  //   return next(new CustomError('Invalid Username', 400))
  // }

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
  if (users.some(user => user.username === username)) {
    errors.push('Username')
  }
  if (users.some(user => user.local.email === email)) {
    errors.push('Email')
  }
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
