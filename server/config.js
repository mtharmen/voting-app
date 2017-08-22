require('dotenv').config()

module.exports = {
  IP: process.env.IP || 'localhost',
  PORT: process.env.PORT || '8080',
  mongodbUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017',
  jwtSecret: process.env.JWT_SECRET || 'notreallysecret',
  SESSION_SECRET: process.env.SESSION_SECRET || 'dontellanyone',
  TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET || 'Q95Rb2IPUJwofE5eJrbIGSqMSqtHoZeeKaxVq8vmERFQoSsJpI',
  TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY || 'oPMZ3PKcnDTSzRea5Xw7fnpXZ',
  CALLBACK_URL: process.env.CALLBACK_URL || 'http://localhost:8080/auth/callback',
  successRedirectUrl: process.env.successRedirectUrl || 'http://localhost:4200',
  failureRedirectUrl: process.env.failureRedirectUrl || 'http://localhost:8080/error',
  admins: process.env.ADMINS || ['admin@test.com']
}
