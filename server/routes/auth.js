const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = express.Router()

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body
    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ message: 'Email already in use' })
    const hashed = await bcrypt.hash(password, 10)
    const user = new User({ username, email, password: hashed })
    await user.save()
    res.status(201).json({ message: 'User created' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })
    const ok = await bcrypt.compare(password, user.password)
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' })
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '8h' })
    res.json({ token })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/me', async (req, res) => {
  try {
    const auth = req.headers.authorization
    if (!auth) return res.status(401).json({ message: 'No token' })
    const token = auth.split(' ')[1]
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(payload.id).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' })
  }
})

module.exports = router