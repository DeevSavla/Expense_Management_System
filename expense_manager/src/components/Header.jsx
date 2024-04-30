import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='flex justify-between bg-gray-100 p-4'>
      <Link to='/'>
        <p>Expense Manager</p>
      </Link>
        <p>USER</p>
    </div>
  )
}

export default Header