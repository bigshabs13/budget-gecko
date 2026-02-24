import { useState } from 'react'
import './LoginPage.css'
import { supabase } from '../supabaseClient'

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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setMessage(error.message || 'Login failed')
      } else {
        setMessage('Login successful!')
        // Redirect or update app state here
      }
    } catch (err) {
      setMessage('Unable to connect to Supabase')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async () => {
    setLoading(true)
    setMessage('')

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        setMessage(error.message || 'Sign up failed')
      } else {
        setMessage('Check your email to confirm your account')
      }
    } catch (err) {
      setMessage('Unable to connect to Supabase')
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
            <button
              type="button"
              className="btn-signup"
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
