import './App.css'
import HomePage from './components/HomePage'
import Register from './components/Register'
import Login from './components/Login'
import LandingPage from './components/LandingPage'
import AboutUs from './components/AboutUs'
import Pricing from './components/Pricing'
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/pricing" element={<Pricing />} />
    </Routes>
  )
}

export function ProtectedRoute(props) {
  if (localStorage.getItem('user')) {
    return props.children
  } else {
    return <Navigate to="/login" />
  }
}

export default App
