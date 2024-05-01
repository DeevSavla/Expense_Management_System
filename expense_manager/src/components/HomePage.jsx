import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { Modal, Form, Input, Select,message, Table } from 'antd'
import axios from 'axios'
import Spinner from './Spinner.jsx'

const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [loading,setLoading] = useState(false)
  const [allTransactions,setAllTransactions] = useState([])

  const columns = [
    {
      title:'Date',
      dataIndex:'date'
    },
    {
      title:'Amount',
      dataIndex:'amount'
    },
    {
      title:'Type',
      dataIndex:'type'
    },
    {
      title:'Category',
      dataIndex:'category'
    },
    {
      title:'Reference',
      dataIndex:'reference'
    },
    {
      title:'Description',
      dataIndex:'description'
    },
  ]

  const getAllTransactions =async () =>{
    try{
      const getUser = JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      const res = await axios.post('http://localhost:8080/transactions/get-transaction',{userid:getUser.findUser._id})
      setLoading(false)
      setAllTransactions(res.data.transactions)
    } catch(error) {
      console.log(error)
      message.error('Error in Fetching Transactions')
    }
  }

  useEffect(()=>{
    getAllTransactions();
  },[showModal])

  const handleSubmit = async (values) => {
    try{
      const getUser = JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      await axios.post('http://localhost:8080/transactions/add-transaction',{...values,userid:getUser.findUser._id})
      setLoading(false)
      message.success('Transaction Added Successfully')
    } catch(error){
      setLoading(false)
      message.error('Failed to Add Transaction')
    }
  }

  return (
    <Layout>
      {loading && <Spinner/>}
      <div className='flex justify-between p-5 shadow-md items-center'>
        <p>range filters</p>
        <button className='bg-blue-500 text-white py-1 px-2 rounded-lg' onClick={() => setShowModal(true)}>Add New</button>
      </div>
      <Table columns={columns} dataSource={allTransactions} rowKey={(record) => record._id}/>
      <Modal title="Add Transaction" open={showModal} onCancel={() => setShowModal(false)} footer={false}>
        <Form layout='vertical' onFinish={handleSubmit}>
          <Form.Item label='Amount' name='amount'>
            <Input type='text' />
          </Form.Item>
          <Form.Item label='Type' name='type'>
            <Select>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='Category' name='category'>
            <Select>
              <Select.Option value='salary'>Salary</Select.Option>
              <Select.Option value='tip'>Tip</Select.Option>
              <Select.Option value='emi'>EMI</Select.Option>
              <Select.Option value='food'>Food</Select.Option>
              <Select.Option value='movie'>Movie</Select.Option>
              <Select.Option value='bills'>Bills</Select.Option>
              <Select.Option value='medical'>Medical</Select.Option>
              <Select.Option value='fee'>Fee</Select.Option>
              <Select.Option value='tax'>Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='Date' name='date'>
            <Input type='date' />
          </Form.Item>
          <Form.Item label='Reference' name='reference'>
            <Input />
          </Form.Item>
          <Form.Item label='Description' name='description'>
            <Input />
          </Form.Item>
          <div className="flex justify-end">
            <button type='submit' className='bg-blue-500 text-white py-1 px-2 rounded-lg'>SAVE</button>
          </div>
        </Form>
      </Modal>
    </Layout>
  )
}

export default HomePage
