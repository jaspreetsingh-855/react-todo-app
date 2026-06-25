import { useState } from 'react'
import { CATEGORIES } from '../constants/categories'

function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [editDescription, setEditDescription] = useState(todo.description || '')
  const [editCategory, setEditCategory] = useState(todo.category)

  const handleSave = () => {
    if (!editText.trim()) return
    onEdit(todo.id, editText, editCategory, editDescription)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setEditDescription(todo.description || '')
    setEditCategory(todo.category)
    setIsEditing(false)
  }

  const categoryClass = `category-badge category-${todo.category.toLowerCase()}`

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      {isEditing ? (
        <div className="todo-edit-panel">
          <div className="todo-edit-row">
            <select
              className="todo-select todo-edit-select"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              aria-label="Edit category"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="todo-input todo-edit-input"
              placeholder="Task title"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
          </div>
          <textarea
            className="todo-textarea"
            placeholder="Task description (optional)"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows={2}
          />
          <div className="todo-edit-actions">
            <button type="button" className="todo-btn todo-btn-save" onClick={handleSave}>
              Save
            </button>
            <button type="button" className="todo-btn todo-btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="todo-content">
            <div className="todo-content-header">
              <span className={categoryClass}>{todo.category}</span>
              <span className="todo-arrow">→</span>
              <span className="todo-text">{todo.text}</span>
            </div>
            {todo.description && (
              <p className="todo-description">{todo.description}</p>
            )}
          </div>
          <div className="todo-actions">
            <button
              type="button"
              className="todo-btn todo-btn-edit"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              type="button"
              className="todo-btn todo-btn-delete"
              onClick={() => onDelete(todo.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  )
}

export default TodoItem
