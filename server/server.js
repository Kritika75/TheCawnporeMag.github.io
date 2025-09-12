require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const authRoutes = require('./routes/auth')
const path = require('path')
const session = require('express-session')

const app = express()
app.use(cors())
app.use(express.json())

// Session middleware for passport
app.use(session({
  secret: process.env.SESSION_SECRET || 'secretkey',
  resave: false,
  saveUninitialized: false
}))

// Initialize passport and session
app.use(passport.initialize())
app.use(passport.session())

// Passport config
require('./config/passport')

app.use('/api/auth', authRoutes)
app.use(express.static(path.join(__dirname, '..')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'))
})

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on ${PORT}`))
  })
  .catch(err => {
    console.error('DB connect error', err)
  })
