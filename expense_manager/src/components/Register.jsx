import {React,useState} from 'react'
import {Form,Input,message} from 'antd'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from './Spinner.jsx'

function Register() {

  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)
  const submitHandler = async (values)=>{
    try{
      setLoading((e)=>!e)
      console.log(values)
      await axios.post('http://localhost:8080/users/register', values)
      message.success('Registration successfull.')
      setLoading((e)=>!e)
      navigate('/login')
    } catch(error){
      setLoading((e)=>!e)
      console.log(error)
      message.error('Error during Registration')
    }
  }

  return (
    <>
    {loading && <Spinner/>}
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
    </>
  )
}

export default Register