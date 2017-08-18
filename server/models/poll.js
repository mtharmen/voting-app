const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  id: String,
  title: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  votes: {
    type: [Number],
    required: true
  },
  colours: [String]
})

module.exports = mongoose.model('Poll', userSchema)
