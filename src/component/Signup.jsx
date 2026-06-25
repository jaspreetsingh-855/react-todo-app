import { useNavigate } from 'react-router-dom'
import { saveUser, login } from '../utils/auth'

function Signup() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value

    const saveResult = saveUser(name, email, password)
    if (!saveResult.success) {
      alert(saveResult.message)
      return
    }

    login(email, password)
    navigate('/dashboard')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Sign Up</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit" className="auth-btn">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
