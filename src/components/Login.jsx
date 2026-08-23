import { useState } from 'react'

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Identifiants incorrects')
        return res.json()
      })
      .then((data) => {
        localStorage.setItem('token', data.token)
        onLoginSuccess(data.token)
      })
      .catch((err) => setError(err.message))
  }

  return (
    <section id="login">
      <div className="wrap login-wrap">
        <div className="section-head">
          <span className="eyebrow">&lt;login/&gt;</span>
          <h2>Connexion</h2>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Se connecter</button>
          {error && <p className="form-note login-error">{error}</p>}
        </form>
      </div>
    </section>
  )
}

export default Login