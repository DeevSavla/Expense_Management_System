import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'

function Header() {
  const [loginUser,setLoginUser]=useState('')

  const navigate = useNavigate()

  //to get data from local storage
  useEffect(()=>{
    const getUser= JSON.parse(localStorage.getItem('user'))
    if(getUser){
      setLoginUser(getUser.findUser.name)
    }
  },[])

  const logoutHandler= ()=>{
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
<div className='flex justify-between bg-gray-100 p-4 items-center'>
  <div>
    <Link to='/' className='text-black text-lg font-semibold'>
      Expense Manager
    </Link>
  </div>
  <div className='flex items-center'>
    {true && <p className='mr-4'>{loginUser}</p>}
    <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600' onClick={logoutHandler}>
      Logout
    </button>
  </div>
</div>

  )
}

export default Header