import { Link, useNavigate, useLocation } from 'react-router-dom'
import { isAuthenticated, logout, getCurrentUser } from '../utils/auth'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const loggedIn = isAuthenticated()
  const user = getCurrentUser()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : ''

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to={loggedIn ? '/dashboard' : '/login'} className="navbar-brand">
          <span className="navbar-logo" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 11l3 3L22 4"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="navbar-brand-text">TodoList</span>
        </Link>

        <nav className="navbar-actions" aria-label="Main navigation">
          {loggedIn ? (
            <>
              <Link
                to="/dashboard"
                className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
              >
                Dashboard
              </Link>
              <div className="navbar-user">
                <span className="navbar-avatar" aria-hidden="true">
                  {initials}
                </span>
                <span className="navbar-user-name">{user?.name}</span>
              </div>
              <button
                type="button"
                className="navbar-btn navbar-btn-outline"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`navbar-link ${isActive('/login') ? 'active' : ''}`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`navbar-btn navbar-btn-primary ${isActive('/signup') ? 'active' : ''}`}
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
