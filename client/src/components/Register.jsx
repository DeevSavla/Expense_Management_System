import React, { useEffect, useState } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    try {
      await axios.post('/users/register', formData);
      message.success('Registration successful.');
      navigate('/login');
    } catch (error) {
      console.log(error);
      message.error('Error during registration');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 via-purple-500 to-pink-500">
      <Form
        className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 border border-purple-900 p-5 rounded-lg bg-white"
        onFinish={submitHandler}
      >
        <h1 className="text-2xl text-center mb-5 text-purple-900">Register Form</h1>
        <Form.Item label="Name" name="name">
          <Input
            className="w-full bg-purple-100 rounded-lg"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input
            type="email"
            className="w-full bg-purple-100 rounded-lg"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input
            type="password"
            className="w-full bg-purple-100 rounded-lg"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Item>
        <div className="text-purple-500 flex justify-between">
          <Link to="/login" className="text-purple-500 hover:text-purple-700">
            Already Registered? Click here to login
          </Link>
          <button className="bg-purple-500 text-white py-1 px-2 rounded-lg hover:bg-purple-700">
            Register
          </button>
        </div>
      </Form>
    </div>
  );
}

export default Register;
