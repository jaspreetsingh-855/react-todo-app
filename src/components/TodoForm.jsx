import { useState } from 'react'
import { CATEGORIES, DEFAULT_CATEGORY } from '../constants/categories'

function TodoForm({ onAdd }) {
  const [text, setText] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState(DEFAULT_CATEGORY)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text, category, description)
    setText('')
    setDescription('')
    setCategory(DEFAULT_CATEGORY)
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="todo-form-fields">
        <div className="todo-form-row">
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
            placeholder="Task title..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <textarea
          className="todo-textarea"
          placeholder="Task description (optional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
        <button type="submit" className="todo-btn todo-btn-add todo-form-submit">
          Add Task
        </button>
      </div>
    </form>
  )
}

export default TodoForm
