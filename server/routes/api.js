const router = require('express').Router()

const User = require('./../models/user')
// const CONFIG = require('./../config')
const my = require('./../helper')
const CustomError = my.CustomError

router.get('/stuff', my.verifyToken, (req, res) => {
  const stuff = ['Stuff', 'Things', 'Junk']
  if (req.payload) {
    stuff.push('User Only Stuff')
  }
  res.json({ stuff })
})

router.get('/getUserInfo', my.verifyToken, my.UserGuard, (req, res) => {
  res.json({ user: req.user })
})

router.put('/update/:field', my.verifyToken, my.passwordCheck, updateUser, my.sendToken)

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
router.get('/profile', my.verifyToken, my.UserGuard, (req, res) => {
  const user = req.user
  res.json(user)
})

// ADMIN ONLY PATH move to api?
router.get('/getAllUsers', my.verifyToken, my.AdminGuard, (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) { next(err) }
    res.json(users)
  })
})

// ADMIN ONLY PATH
router.delete('/deleteUser/:id', my.verifyToken, my.AdminGuard, (req, res, next) => {
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

const Poll = require('./../models/poll')

router.get('/get-poll/:id', (req, res, next) => {
  Poll.findById(req.params.id).exec()
    .then(poll => {
      res.json(poll)
    })
    .catch(err => {
      return next(err)
    })
})

router.post('/make-poll', my.verifyToken, pollCheck, (req, res, next) => {
  const newPoll = new Poll()
  newPoll.title = req.body.title
  newPoll.owner = req.body.owner
  newPoll.options = req.body.options
  newPoll.votes = req.body.votes
  newPoll.save(err => {
    if (err) {
      return next(err)
    }
    res.send(newPoll._id)
  })
})

function pollCheck (req, res, next) {
  if (!req.body.title) {
    return next(new CustomError('Missing Title', 400))
  }
  if (!req.body.owner) {
    return next(new CustomError('Missing Owner', 400))
  }
  if (!req.body.options || !req.body.options.length) {
    return next(new CustomError('Missing Options', 400))
  }
  if (!req.body.votes || !req.body.options.votes) {
    return next(new CustomError('Missing Votes', 400))
  }
  next()
}

router.post('/poll-vote/:id', my.verifyToken, (req, res, next) => {
  Poll.findById(req.params.id).exec()
    .then(poll => {
      const i = poll.options.indexOf(req.body.choice)
      if (i < 0) {
        throw new CustomError('Invalid Choice', 403)
      }
      poll.votes[i]++
      return poll.save()
    })
    .then(poll => {
      res.send('Poll Updated')
    })
    .catch(err => {
      return next(err)
    })
})

router.post('/poll-add-option/:id', my.verifyToken, (req, res, next) => {
  Poll.findById(req.params.id).exec()
    .then(poll => {
      if (poll.options.length > 9) {
        throw new CustomError('Maximum of 10 options', 403)
      }
      poll.options.push(req.body.newOption)
      poll.votes.push(0)
      return poll.save()
    })
    .then(poll => {
      res.send('Poll Updated')
    })
    .catch(err => {
      return next(err)
    })
})

router.delete('/delete-poll/:id', my.verifyToken, (req, res, next) => {
  Poll.findByIdAndRemove(req.params.id).exec()
    .then(poll => {
      res.send(`Poll ID: ${req.params.id} Deleted`)
    })
    .catch(err => {
      return next(err)
    })
})

module.exports = router
