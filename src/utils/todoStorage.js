function getKey(email) {
  return `todos_${email}`
}

export function getTodos(email) {
  const todos = localStorage.getItem(getKey(email))
  return todos ? JSON.parse(todos) : []
}

export function saveTodos(email, todos) {
  localStorage.setItem(getKey(email), JSON.stringify(todos))
}
