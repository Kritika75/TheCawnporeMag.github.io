const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const authRoutes = require('./routes/auth')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
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