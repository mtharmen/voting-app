const mongoose = require('mongoose')

// TODO: Last update field?

let pollScheme = new mongoose.Schema({
  id: String,
  title: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  labels: {
    type: [String],
    required: true
  },
  data: {
    type: [Number],
    required: true
  },
  colours: [String]
})

module.exports = mongoose.model('Poll', pollScheme)
