const USERS_KEY = 'users'
const SESSION_KEY = 'isLoggedin'
const CURRENT_USER_KEY = 'currentUser'

export function getUsers() {
  const users = localStorage.getItem(USERS_KEY)
  return users ? JSON.parse(users) : []
}

export function saveUser(name, email, password) {
  const users = getUsers()
  if (users.some((user) => user.email === email)) {
    return { success: false, message: 'Email already registered' }
  }
  users.push({ name, email, password })
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  return { success: true }
}

export function login(email, password) {
  const users = getUsers()
  const user = users.find((u) => u.email === email && u.password === password)
  if (!user) {
    return { success: false, message: 'Invalid email or password' }
  }
  localStorage.setItem(SESSION_KEY, 'true')
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ name: user.name, email: user.email }))
  return { success: true, user: { name: user.name, email: user.email } }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
  localStorage.removeItem(CURRENT_USER_KEY)
}

export function getCurrentUser() {
  const user = localStorage.getItem(CURRENT_USER_KEY)
  return user ? JSON.parse(user) : null
}

export function isAuthenticated() {
  return localStorage.getItem(SESSION_KEY) === 'true' && getCurrentUser() !== null
}
