import { useState, useEffect } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import { getCurrentUser } from '../utils/auth'
import { getTodos, saveTodos } from '../utils/todoStorage'
import { DEFAULT_CATEGORY } from '../constants/categories'

function normalizeTodos(todos) {
  return todos.map((todo) => ({
    ...todo,
    category: todo.category || DEFAULT_CATEGORY,
    description: todo.description || '',
  }))
}

function TodoApp() {
  const user = getCurrentUser()
  const [todos, setTodos] = useState(() => normalizeTodos(getTodos(user.email)))
  const [filterCategory, setFilterCategory] = useState('All')

  useEffect(() => {
    saveTodos(user.email, todos)
  }, [todos, user.email])

  const addTodo = (text, category, description = '') => {
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      description: description.trim(),
      completed: false,
      category,
    }
    setTodos([...todos, newTodo])
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const editTodo = (id, newText, newCategory, newDescription = '') => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text: newText.trim(),
              category: newCategory,
              description: newDescription.trim(),
            }
          : todo
      )
    )
  }

  const totalTasks = todos.length
  const completedTasks = todos.filter((todo) => todo.completed).length
  const pendingTasks = totalTasks - completedTasks

  const filters = ['All', 'Work', 'Personal', 'Study', 'Shopping']

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <p className="todo-welcome">Welcome, {user.name}</p>

      <TodoForm onAdd={addTodo} />

      <div className="category-filters">
        {filters.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`category-filter ${filterCategory === cat ? 'active' : ''} ${
              cat !== 'All' ? `category-${cat.toLowerCase()}` : ''
            }`}
            onClick={() => setFilterCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <TodoList
        todos={todos}
        filterCategory={filterCategory}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
        onEdit={editTodo}
      />

      <div className="todo-stats">
        <div className="stat-card">
          <span className="stat-value">{totalTasks}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{completedTasks}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{pendingTasks}</span>
          <span className="stat-label">Pending</span>
        </div>
      </div>
    </div>
  )
}

export default TodoApp
