const router = require('express').Router()

const User = require('./../models/user')

// TODO: Better name for error
function CustomError (message, status, name) {
  Error.captureStackTrace(this, name || this.constructor)

  this.name = this.constructor.name
  this.message = message || 'Something went wrong.'
  this.status = status || 500
}

router.get('/stuff', (req, res) => {
  const stuff = ['Stuff', 'Things', 'Junk']
  if (req.user) {
    stuff.push('User Only Stuff')
  }
  res.json({ stuff })
})

router.get('/getUserInfo', sendUser)

function sendUser (req, res) {
  res.json({ user: req.user })
}

router.put('/update/:field', AuthCheck, passwordCheck, updateUser, sendUser)

function passwordCheck (req, res, next) {
  User.findById({ _id: req.user._id }, (err, user) => {
    if (err) { return next(err) }
    if (!user) {
      return next(new CustomError('No User Found', 404))
    } else if (!user.verifyPassword(req.body.currentPassword)) {
      return next(new CustomError('Wrong Password', 401))
    }
    req.user = user
    return next()
  })
}

function updateUser (req, res, next) {
  const field = req.params.field
  console.log('Field: ' + field)
  User.findById(req.user._id).exec()
    .then(user => {
      if (!user) {
        console.log('no User')
        throw new CustomError('User not found', 404)
      }
      user.local = user.local || {}
      if (field === 'Name') {
        console.log('updating name')
        user.profile.firstname = req.body.firstname
        user.profile.lastname = req.body.lastname
      } else if (field === 'Email') {
        console.log('updating email')
        user.local.email = req.body.email
      } else if (field === 'Password') {
        console.log('updating password')
        user.local.password = user.generateHash(req.body.newPassword)
      } else {
        throw new CustomError('Invalid field', 400)
      }
      return user.save()
    })
    .then(saved => {
      req.user = saved
      console.log('user updated')
      return next()
    })
    .catch(err => {
      return next(err)
    })
}

// ADMIN ONLY PATH
router.get('/profile', AuthCheck, (req, res, next) => {
  res.json(req.user)
})

// ADMIN ONLY PATH
router.get('/getAllUsers', AdminCheck, (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) { next(err) }
    res.json(users)
  })
})

// ADMIN ONLY PATH
router.delete('/deleteUser/:id', AdminCheck, (req, res, next) => {
  const id = req.params.id
  res.json(id)
  // User.findById(id).exec()
  //   .then(user => {
  //     if (!user) {
  //       throw new CustomError('No User Found', 404)
  //     }
  //     if (user.role === 'admin') {
  //       throw new CustomError('Cannot remove admin', 403)
  //     }
  //     return User.findByIdAndRemove(id).exec()
  //   })
  //   .then(removed => {
  //     return res.json({ message: 'removed' })
  //   })
  //   .catch(err => {
  //     return next(err)
  //   })
})

function AuthCheck (req, res, next) {
  if (!req.user) {
    return next(new CustomError('No User found', 404))
  }
  next()
}

function AdminCheck (req, res, next) {
  if (!req.user) {
    return next(new CustomError('No User found', 404))
  }
  if (req.user.role !== 'admin') {
    return next(new CustomError('Admin Only'), 403)
  }
  next()
}

module.exports = router
