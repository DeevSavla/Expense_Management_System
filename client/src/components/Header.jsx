import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const [loginUser, setLoginUser] = useState('')

  const navigate = useNavigate()

  //to get data from local storage
  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem('user'))
    if (getUser) {
      setLoginUser(getUser.findUser.name)
    }
  }, [])

  const logoutHandler = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className='flex justify-between bg-blue-600 p-4 items-center'>
      <div>
        <Link to='/' className='text-white text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl'>
          Expense Manager
        </Link>
      </div>
      <div className='flex items-center'>
        {true && <Link to='/'><p className='mr-4 text-white font-medium'>{loginUser}</p></Link>}
        <button 
          className='bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 sm:px-6 sm:py-2 md:px-6 md:py-2 lg:px-6 lg:py-2 shadow-md hover:shadow-lg' 
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Header