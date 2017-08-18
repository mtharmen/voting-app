const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  profile: {
    firstname: String,
    lastname: String
  },
  local: {
    email: String,
    password: String
  },
  twitter: {
    id: String,
    // token: String,
    // tokenSecret: String,
    // username: String
    // TODO: twitter avatar?
    displayName: String
  },
  role: {
    type: String,
    default: 'member' // guest, member, admin
  }
})

userSchema.methods.generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

// NOTE: ES6 Arrow Syntax breaks this
userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password)
}

// Auto hash password
// userSchema.pre('save', function(next) {
//   if (!this.local) {
//   return next()
//   }
//   if (!this.isModified('local.password')) {
//   return next()
//   }
//   this.local.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
//   next()
// })

module.exports = mongoose.model('User', userSchema)
