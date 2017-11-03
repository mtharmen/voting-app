const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const path = require('path')

const CONFIG = require('./server/config')

// ************************************************************************************ MONGOOSE SETUP
mongoose.Promise = global.Promise
const dbName = 'mtharmen-voting-app'
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

if (process.env.NODE_ENV === 'dev') {
  const morgan = require('morgan')
  app.use(morgan('dev'))

  // CORS Support
  const cors = require('cors')
  const allowedOrigins = [
    'http://localhost:4200',
    'http://localhost:8080',
    'https://api.twitter.com'
  ]
  const corsOptions = {
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.indexOf(origin) > -1) {
        cb(null, true)
      } else {
        cb(new Error('Invalid Origin'))
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  }
  app.use(cors(corsOptions))
  app.options('*', cors(corsOptions))
}

// Session Setup
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

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

app.get('/error', (req, res) => {
  const error = req.session.err || { message: 'Server Error', status: 500 }
  console.error(error)
  res.send(`
    <p style="font-size: 50px">
      ${error.status}: <small>${error.message}</small>
    </p>
  `)
})

if (process.env.NODE_ENV !== 'dev') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
  })
}

app.listen(CONFIG.PORT, () => { console.log(`Server listening on ${CONFIG.IP}:${CONFIG.PORT}`) })
