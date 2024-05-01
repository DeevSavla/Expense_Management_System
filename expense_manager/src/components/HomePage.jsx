import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { Modal, Form, Input, Select, message, Table, DatePicker } from 'antd'
import axios from 'axios'
import moment from 'moment'
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [allTransactions, setAllTransactions] = useState([])
  const [frequency, setFrequency] = useState('7')
  const [selectedDate, setSelectedDate] = useState([])
  const [type, setType] = useState('all')
  const [category, setCategory] = useState('all')

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title: 'Amount',
      dataIndex: 'amount'
    },
    {
      title: 'Type',
      dataIndex: 'type'
    },
    {
      title: 'Category',
      dataIndex: 'category'
    },
    {
      title: 'Reference',
      dataIndex: 'reference'
    },
    {
      title: 'Description',
      dataIndex: 'description'
    },
  ]

  const getAllTransactions = async () => {
    try {
      const getUser = JSON.parse(localStorage.getItem('user'))
      const res = await axios.post('http://localhost:8080/transactions/get-transaction', { userid: getUser.findUser._id, frequency, selectedDate, type, category })
      setAllTransactions(res.data.transactions)
    } catch (error) {
      console.log(error)
      message.error('Error in Fetching Transactions')
    }
  }

  useEffect(() => {
    getAllTransactions();
  }, [frequency, showModal, selectedDate, type, category])

  const handleSubmit = async (values) => {
    try {
      const getUser = JSON.parse(localStorage.getItem('user'))
      await axios.post('http://localhost:8080/transactions/add-transaction', { ...values, userid: getUser.findUser._id })
      message.success('Transaction Added Successfully')
    } catch (error) {
      message.error('Failed to Add Transaction')
    }
  }

  return (
    <Layout>
      <div className='flex justify-between p-5 shadow-md items-center'>
        <div className='flex gap-6'>
          <div>
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(values) => setFrequency(values)} className="w-32">
              <Select.Option value='7'>Last 1 Week</Select.Option>
              <Select.Option value='30'>Last 1 Month</Select.Option>
              <Select.Option value='365'>Last 1 Year</Select.Option>
              <Select.Option value='custom'>Custom</Select.Option>
            </Select>
            {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />}
          </div>
          <div>
            <h6>Select Type</h6>
            <Select value={type} onChange={(values) => setType(values)} className="w-28">
              <Select.Option value='all'>All</Select.Option>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>
            </Select>
          </div>
          <div>
            <h6>Select Category</h6>
            <Select value={category} onChange={(values) => setCategory(values)} className="w-28">
              <Select.Option value='all'>All</Select.Option>
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
          </div>
        </div>
        <button className='bg-blue-500 text-white py-1 px-2 rounded-lg hover:bg-blue-700' onClick={() => setShowModal(true)}>Add New</button>
      </div>
      <Table columns={columns} dataSource={allTransactions} rowKey={(record) => record._id} />
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
