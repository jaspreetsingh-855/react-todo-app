import TodoItem from './TodoItem'
import { CATEGORIES } from '../constants/categories'

function TodoList({ todos, filterCategory, onDelete, onToggle, onEdit }) {
  if (todos.length === 0) {
    return <p className="todo-empty">No tasks yet. Add one above!</p>
  }

  const filtered =
    filterCategory === 'All'
      ? todos
      : todos.filter((todo) => todo.category === filterCategory)

  if (filtered.length === 0) {
    return <p className="todo-empty">No tasks in this category.</p>
  }

  const grouped = CATEGORIES.reduce((acc, category) => {
    const items = filtered.filter((todo) => todo.category === category)
    if (items.length > 0) acc.push({ category, items })
    return acc
  }, [])

  return (
    <div className="todo-list-wrapper">
      {grouped.map(({ category, items }) => (
        <section key={category} className="todo-category-section">
          <h2 className={`todo-category-heading category-${category.toLowerCase()}`}>
            {category}
          </h2>
          <ul className="todo-list">
            {items.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={onDelete}
                onToggle={onToggle}
                onEdit={onEdit}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

export default TodoList
