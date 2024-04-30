import React from 'react'
import {Form,Input,message} from 'antd'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Spinner from './Spinner'
import axios from 'axios'

function Login() {

    const [loading,setLoading] = useState(false)

    const navigate= useNavigate()

    const submitHandler = async (values)=>{
      try{
        setLoading((e)=>!e)
        const {data} = await axios.post('http://localhost:8080/users/login',values)
        console.log(data)
        message.success('Login Success')
        setLoading((e)=>!e)
        localStorage.setItem('user',JSON.stringify({...data,password:''}))
        navigate('/')
      } catch(error){
        setLoading((e)=>!e)
        message.error('Login Error')
      }
    }
  
    return (
      <>
      {loading && <Spinner/>}
      <Form className='w-1/3 border border-black p-5 m-auto mt-32' onFinish={submitHandler}>
          <h1 className='text-2xl text-center mb-5'>Login Form</h1>
          <Form.Item label='Email' name="email">
              <Input type='email'/>
          </Form.Item>
          <Form.Item label='Password' name="password">
              <Input type='password'/>
          </Form.Item>
          <div className='text-blue-500 flex justify-between'>
            <Link to='/register'>Not a user ? Click here to register</Link>
            <button className='bg-blue-500 text-white py-1 px-2 rounded-lg'>Login</button>
          </div>
      </Form>
      </>
    )
}

export default Login