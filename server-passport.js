const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const CONFIG = require('./server-passport/config')

// ************************************************************************************ MONGOOSE SETUP
mongoose.Promise = global.Promise
const dbName = 'testDB'
mongoose.connect(CONFIG.mongodbUrl + `/${dbName}`, { useMongoClient: true })
const db = mongoose.connection
db.on('error', err => { console.error(err) })
db.once('open', () => {
  console.log('Connected to ' + dbName)
})

// Close MongoDB connection
process.on('SIGINT', () => {
  db.close(() => {
    console.log(`Closing connection to ${dbName}`)
    process.exit(0)
  })
})

// ************************************************************************************ MIDDLEWARE
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('X-HTTP-Method-Override'))

if (process.env.NODE_ENV !== 'dev') {
  const morgan = require('morgan')
  app.use(morgan('dev'))
}

// Session Setup
// const cookieParser = require('cookie-parser')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

require('./server-passport/passport')

// app.use(cookieParser())
app.use(session({
  secret: CONFIG.SESSION_SECRET,
  resave: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

// CORS Support
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://127.0.0.1:4200',
    'http://localhost:4200',
    'https://api.twitter.com'
  ]
  let origin = req.headers.origin
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  const allowedHeaders = [
    'Accept',
    'Access-Control-Allow-Credentials',
    'Authorization',
    'Content-Type',
    'Origin',
    'X-Requested-With'
  ].join(', ')
  // res.header('Access-Control-Allow-Origin', 'http://localhost:4200')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', allowedHeaders)
  res.header('Access-Control-Expose-Headers', 'Authorization')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

// ************************************************************************************ ROUTES
app.get('/', (req, res) => {
  res.json(req.user)
})
app.use('/auth', require('./server-passport/routes/auth'))
app.use('/api', require('./server-passport/routes/api'))

// ************* Error Handler
if (process.env.NODE_ENV !== 'dev') {
  app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(err.status || 500).json(err)
  })
}

// ************************************************************************************ TESTING

app.listen(CONFIG.PORT, () => { console.log(`Server listening on ${CONFIG.IP}:${CONFIG.PORT}`) })
