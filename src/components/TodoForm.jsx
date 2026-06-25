import { useState } from 'react'
import { CATEGORIES, DEFAULT_CATEGORY } from '../constants/categories'

function TodoForm({ onAdd }) {
  const [text, setText] = useState('')
  const [category, setCategory] = useState(DEFAULT_CATEGORY)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text, category)
    setText('')
    setCategory(DEFAULT_CATEGORY)
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <select
        className="todo-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Task category"
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        type="text"
        className="todo-input"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="todo-btn todo-btn-add">
        Add
      </button>
    </form>
  )
}

export default TodoForm
