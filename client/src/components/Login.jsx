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
      message.success("login success");
      localStorage.setItem("user", JSON.stringify({ ...data }));
      navigate("/");
    } catch (error) {
      message.error("something went wrong");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-400 to-pink-500">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 border border-purple-900 p-5 m-auto rounded-lg bg-white">
        <Form onFinish={submitHandler}>
          <h1 className="text-2xl text-center mb-5 text-purple-950">Login Form</h1>
          <Form.Item label="Email" name="email" >
            <Input type="email" className="bg-purple-100 rounded-lg" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" className="bg-purple-100 rounded-lg" />
          </Form.Item>
          <div className="text-blue-500 flex justify-between">
            <Link to="/register" className="text-purple-500 hover:text-purple-700">Not a user? Click here to register</Link>
            <button className="bg-purple-500 text-white py-1 px-2 rounded-lg hover:bg-purple-700">Login</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
