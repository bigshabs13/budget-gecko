import { useState } from 'react'
import './LoginPage.css'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        setMessage('Login successful!')
        // Redirect or update app state here
      } else {
        setMessage(data.error || 'Login failed')
      }
    } catch (err) {
      setMessage('Unable to connect to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-branding">
          <img src="/logo.png" alt="Budget Gecko" className="login-logo" />
          <h1 className="login-welcome">
            Welcome to<br /><span>Budget Gecko</span>
          </h1>
          <p className="login-tagline">
            Smart budgeting tool for saving money
          </p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-container">
          <h2>Sign in</h2>
          <form onSubmit={handleLogin} className="login-form">
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </label>
            {message && <p className="login-message">{message}</p>}
            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? 'Signing in...' : 'Login'}
            </button>
            <button type="button" className="btn-signup">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
