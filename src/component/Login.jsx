import { useNavigate } from 'react-router-dom'
import { login } from '../utils/auth'

function Login() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    const result = login(email, password)
    if (result.success) {
      navigate('/dashboard')
    } else {
      alert(result.message)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Login</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit" className="auth-btn">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
