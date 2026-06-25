import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './component/Login'
import Signup from './component/Signup'
import TodoApp from './components/TodoApp'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <TodoApp />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
