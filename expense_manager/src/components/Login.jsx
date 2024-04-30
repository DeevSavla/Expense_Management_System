import React from 'react'
import {Form,Input} from 'antd'
import { Link } from 'react-router-dom'

function Login() {
    const submitHandler = (values)=>{
      console.log(values)
    }
  
    return (
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
    )
}

export default Login