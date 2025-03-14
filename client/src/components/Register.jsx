import React, { useEffect, useState } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../utilities/baseUrl'

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    try {
      await axios.post(`${baseUrl}/users/register`, formData);
      message.success('Registration successful! Please login to continue.');
      navigate('/login');
    } catch (error) {
      console.log(error);
      message.error('Registration failed. Please try again.');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-blue-100 to-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <div>
          <h2 className="mt-4 text-center text-3xl font-bold text-blue-900">
            Create Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join us to start managing your expenses efficiently
          </p>
        </div>
        <Form
          onFinish={submitHandler}
          layout="vertical"
          className="mt-8 space-y-6"
        >
          <Form.Item
            label={<span className="text-gray-700 font-medium">Name</span>}
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Enter your full name"
            />
          </Form.Item>
          <Form.Item
            label={<span className="text-gray-700 font-medium">Email</span>}
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Enter your email"
            />
          </Form.Item>
          <Form.Item
            label={<span className="text-gray-700 font-medium">Password</span>}
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
          >
            <Input.Password
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Create a strong password"
            />
          </Form.Item>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
            >
              Already have an account? Sign in
            </Link>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Register
            </button>
          </div>
        </Form>
        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
