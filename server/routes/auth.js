import express from 'express'

const router = express.Router()

// Demo login - in production use a database and proper auth (JWT, bcrypt)
router.post('/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' })
  }

  // Placeholder validation - replace with real auth
  if (email && password.length >= 6) {
    return res.status(200).json({
      message: 'Login successful',
      user: { email },
    })
  }

  res.status(401).json({ error: 'Invalid email or password' })
})

router.post('/signup', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' })
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' })
  }

  // Placeholder - replace with database registration
  res.status(201).json({
    message: 'Account created',
    user: { email },
  })
})

export default router
