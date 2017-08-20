const router = require('express').Router()

const User = require('./../models/user')
const Poll = require('./../models/poll')
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

router.get('/get-all-polls/:id?', (req, res, next) => {
  const query = {}
  if (req.params.id) {
    query.owner = req.params.id
  }
  Poll.find(query, '_id title', (err, polls) => {
    if (err) {
      return next(err)
    }
    res.json(polls)
  })
})

router.get('/get-poll/:id', (req, res, next) => {
  Poll.findById(req.params.id).exec()
    .then(poll => {
      if (!poll) {
        throw new CustomError('No Poll Found', 404)
      }
      req.poll = poll
      return User.findById(poll.owner).exec()
      // res.json(poll)
    })
    .then(user => {
      req.poll.owner = user.username || '*Unknown*'
      res.json(req.poll)
    })
    .catch(err => {
      return next(err)
    })
})

router.post('/make-poll', my.verifyToken, my.UserGuard, pollCheck, (req, res, next) => {
  const newPoll = new Poll()
  newPoll.title = req.body.title
  newPoll.owner = req.user._id
  newPoll.labels = req.body.options
  newPoll.data = new Array(req.body.options.length).fill(0)
  newPoll.save(err => {
    if (err) {
      return next(err)
    }
    console.log(newPoll._id)
    res.json({ id: newPoll._id })
  })
})

function pollCheck (req, res, next) {
  if (!req.body.title) {
    return next(new CustomError('Missing Title', 400))
  }
  // if (!req.body.owner) {
  //   return next(new CustomError('Missing Owner', 400))
  // }
  if (!req.body.options || !req.body.options.length) {
    return next(new CustomError('Missing Options', 400))
  }
  // if (!req.body.votes || !req.body.options.votes) {
  //   return next(new CustomError('Missing Votes', 400))
  // }
  Poll.findOne({ title: req.body.title }).exec()
    .then(poll => {
      if (poll) {
        return next(new CustomError('Poll With Same Title Already Exists', 409))
      }
      return next()
    })
    .catch(err => {
      next(err)
    })
}

router.put('/poll-vote/:id', (req, res, next) => {
  Poll.findById(req.params.id).exec()
    .then(poll => {
      const i = req.body.index
      if (i < 0 || i >= poll.labels.length) {
        throw new CustomError('Invalid Choice', 401)
      }
      // poll.data[i]++
      const update = {}
      const entry = {}
      entry['data.' + i] = 1
      update.$inc = entry
      return Poll.findByIdAndUpdate(poll._id, update).exec()
      // return poll.save()
    })
    .then(poll => {
      res.send('Poll Updated')
    })
    .catch(err => {
      return next(err)
    })
})

router.put('/poll-add-option/:id', my.verifyToken, (req, res, next) => {
  Poll.findById(req.params.id).exec()
    .then(poll => {
      if (poll.labels.length > 9) {
        throw new CustomError('Maximum of 10 options', 401)
      }
      poll.labels.push(req.body.newOption)
      poll.data.push(0)
      return poll.save()
    })
    .then(poll => {
      res.send('Poll Updated')
    })
    .catch(err => {
      return next(err)
    })
})

router.delete('/delete-poll/:id', my.verifyToken, my.UserGuard, (req, res, next) => {
  Poll.findById(req.params.id).exec()
    .then(poll => {
      if (poll.owner !== req.user._id.toString() && req.user.role !== 'admin') {
        throw new CustomError(`Only the owner or an Admin can delete Poll ID: ${req.params.id}`, 401)
      }
      return Poll.findByIdAndRemove(req.params.id).exec()
    })
    .then(result => {
      res.send(`Poll ID: ${req.params.id} Deleted`)
    })
    .catch(err => {
      return next(err)
    })
})

module.exports = router
