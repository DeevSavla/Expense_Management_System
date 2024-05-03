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
    <div className='flex justify-between bg-purple-400 p-4 items-center'>
      <div>
        <Link to='/' className='text-white text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl'>
          Expense Manager
        </Link>
      </div>
      <div className='flex items-center'>
        {true && <Link to='/'><p className='mr-4 text-white'>{loginUser}</p></Link>}
        <button className='bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-500 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-8 lg:py-3' onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </div>


  )
}

export default Header