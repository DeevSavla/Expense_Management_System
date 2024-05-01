import { React, useEffect, useState } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    try {
      console.log(values);
      await axios.post('http://localhost:8080/users/register', values);
      message.success('Registration successful.');
      navigate('/login');
    } catch (error) {
      console.log(error);
      message.error('Error during registration');
    }
  };

  useEffect(()=>{
    if(localStorage.getItem('user')){
      navigate('/')
    }
  },[navigate])

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Form className='w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 border border-black p-5' onFinish={submitHandler}>
          <h1 className='text-2xl text-center mb-5'>Register Form</h1>
          <Form.Item label='Name' name='name'>
            <Input className='w-full' />
          </Form.Item>
          <Form.Item label='Email' name='email'>
            <Input type='email' className='w-full' />
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <Input type='password' className='w-full' />
          </Form.Item>
          <div className='text-blue-500 flex justify-between'>
            <Link to='/login'>Already Registered? Click here to login</Link>
            <button className='bg-blue-500 text-white py-1 px-2 rounded-lg hover:bg-blue-700'>Register</button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Register;
