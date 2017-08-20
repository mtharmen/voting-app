const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const path = require('path')

const CONFIG = require('./server/config')

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

const morgan = require('morgan')
app.use(morgan('dev'))

// Session Setup
// const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

// app.use(cookieParser())
app.use(session({
  secret: CONFIG.SESSION_SECRET,
  resave: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
  }
}))

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
if (process.env.NODE_ENV !== 'dev') {
  app.use('/', express.static(path.join(__dirname, './dist')))
}

app.use('/auth', require('./server/routes/auth'))
app.use('/api', require('./server/routes/api'))

// ************* Error Handler
app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(err.status || 500).json(err)
})

// ************************************************************************************ TESTING
app.get('/test1', test1)
app.get('/test2', test2)

function test1 (req, res, next) {
  req.session.user = 'Testing'
  console.log(req.session.user)
  res.send('testing')
}

function test2 (req, res) {
  console.log(req.session)
  res.json(req.session)
}

if (process.env.NODE_ENV !== 'dev') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
  })
}

app.listen(CONFIG.PORT, () => { console.log(`Server listening on ${CONFIG.IP}:${CONFIG.PORT}`) })
