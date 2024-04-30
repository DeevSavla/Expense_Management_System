import {React} from 'react'
import {Form,Input} from 'antd'
import { Link } from 'react-router-dom'

function Register() {

  const submitHandler = (values)=>{
    console.log(values)
  }

  return (
    <Form className='w-1/3 border border-black p-5 m-auto mt-32' onFinish={submitHandler}>
        <h1 className='text-2xl text-center mb-5'>Register Form</h1>
        <Form.Item label='Name' name="name">
            <Input/>
        </Form.Item>
        <Form.Item label='Email' name="email">
            <Input type='email'/>
        </Form.Item>
        <Form.Item label='Password' name="password">
            <Input type='password'/>
        </Form.Item>
        <div className='text-blue-500 flex justify-between'>
          <Link to='/login'>Already Registered? Click here to login</Link>
          <button className='bg-blue-500 text-white py-1 px-2 rounded-lg'>Register</button>
        </div>
    </Form>
  )
}

export default Register