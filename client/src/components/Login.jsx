import React, { useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../utilities/baseUrl";

const Login = () => {
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    try {
      const { data } = await axios.post(`${baseUrl}/users/login`, values);
      message.success("Login successful!");
      localStorage.setItem("user", JSON.stringify({ ...data }));
      navigate("/dashboard");
    } catch (error) {
      message.error("Invalid credentials. Please try again.");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-blue-100 to-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <div>
          <h2 className="mt-4 text-center text-3xl font-bold text-blue-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to manage your expenses efficiently
          </p>
        </div>
        <Form
          onFinish={submitHandler}
          layout="vertical"
          className="mt-8 space-y-6"
        >
          <Form.Item
            label={<span className="text-gray-700 font-medium">Email</span>}
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              type="email"
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Enter your email"
            />
          </Form.Item>
          <Form.Item
            label={<span className="text-gray-700 font-medium">Password</span>}
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Enter your password"
            />
          </Form.Item>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/register"
              className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
            >
              New user? Register here
            </Link>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Login
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
};

export default Login;
