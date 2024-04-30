import './App.css'
import HomePage from './components/HomePage'
import Register from './components/Register'
import Login from './components/Login'
import { Routes,Route, Navigate } from 'react-router-dom'


function App() {

  return (
    <Routes>
      <Route path='/' element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
  )
}

export function ProtectedRoute(props){
  if(localStorage.getItem('user'))
  {
    return props.children
  } else{
    return <Navigate to='/login'/>
  }
}

export default App
