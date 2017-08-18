const router = require('express').Router()
const passport = require('passport')
const CONFIG = require('./../config')
const User = require('./../models/user')

router.get('/twitter', passport.authenticate('twitter-login'))
router.get('/twitter/callback', passport.authenticate('twitter-login', {
  successRedirect: CONFIG.successRedirectUrl,
  failureRedirect: CONFIG.failureRedirectUrl
}))
router.get('/twitter/connect', passport.authenticate('twitter-connect'))
router.get('/twitter/callback/connect', passport.authenticate('twitter-login', {
  successRedirect: CONFIG.successRedirectUrl,
  failureRedirect: CONFIG.failureRedirectUrl
}))

router.get('/twitter/disconnect', disconnectTwitter, sendUser)

function disconnectTwitter (req, res, next) {
  console.log(req.user)
  const user = req.user
  User.findByIdAndUpdate(user._id, { $unset: { twitter: '' } }, { new: true }).exec()
    .then(user => {
      req.user = user
      return next()
    })
    .catch(err => {
      return next(err)
    })
}

router.post('/local/signup', passport.authenticate('local-signup'), sendUser)
router.post('/local/login', passport.authenticate('local-login'), sendUser)

router.post('/local/connect', (req, res) => {
  if (req.body.email && req.body.username) {
    res.redirect('/local/signup')
  } else {
    res.redirect('/local/login')
  }
})

router.get('/twitter/get-user', sendUser)

function sendUser (req, res, next) {
  const user = pruneUser(req.user)
  res.json(user)
}

router.get('/logout', (req, res, next) => {
  // req.logout()
  req.session.destroy(err => {
    if (err) {
      return next(err)
    }
    res.json({ message: 'logged out' })
  })
  // res.json({ message: 'logged out' })
})

function pruneUser (user) {
  return {
    _id: user._id,
    username: user.username,
    profile: JSON.stringify(user.profile || {}),
    // twitter_id: user.twitter ? user.twitter.id : '',
    twitter: JSON.stringify(user.twitter || {}),
    email: user.local ? user.local.email : '',
    role: user.role
  }
}

module.exports = router
