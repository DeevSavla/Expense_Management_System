import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { Modal, Form, Input, Select, message, Table, DatePicker } from 'antd'
import axios from 'axios'
import moment from 'moment'
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Analytics from './Analytics'
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [allTransactions, setAllTransactions] = useState([])
  const [frequency, setFrequency] = useState('7')
  const [selectedDate, setSelectedDate] = useState([])
  const [type, setType] = useState('all')
  const [category, setCategory] = useState('all')
  const [viewData, setViewData] = useState('table')
  const [addRecord, setAddRecord] = useState(false)
  const [editable, setEditable] = useState(null)
  const [deleted,setDeleted] = useState(false)

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
      align: 'center'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      align: 'center'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      align: 'center'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      align: 'center'
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
      align: 'center'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      align: 'center'
    },
    {
      title: 'Actions',
      render: (record) => (
        <div>
          <EditOutlined onClick={() => {
            setEditable(record)
            setShowModal(true)
          }} />
          <DeleteOutlined className='mx-3' onClick={() => {
            handleDelete(record);
          }} />
        </div>
      ),
      align: 'center'
    }
  ]

  const handleDelete = async (record) => {
    try {
      setDeleted((e)=>!e)
      await axios.post("http://localhost:8080/transactions/delete-transaction", {
        transacationId: record._id,
      })
      message.success("Transaction Deleted!");
      setDeleted((e)=>!e)
    } catch (error) {
      console.log(error);
      message.error("Unable to Delete");
      setDeleted((e)=>!e)
    }
  };

  const handleSubmit = async (values,record) => {
    try {
      const getUser = JSON.parse(localStorage.getItem('user'))
      if (editable) {
        await axios.post('http://localhost:8080/transactions/edit-transaction', {
          payload: {
            ...values,
            userid: getUser.findUser._id,
            transactionId: editable._id,
          }
        }
        )
        message.success('Transaction Updated Successfully')
        setShowModal(false)
      } else {
        setAddRecord((e)=>!e)
        await axios.post('http://localhost:8080/transactions/add-transaction', { ...values, userid: getUser.findUser._id })
        message.success('Transaction Added Successfully')
        setEditable(null)
        setAddRecord((e)=>!e)
        setShowModal(false)
      }
    } catch (error) {
      setShowModal(false)
      message.error('Failed to Add Transaction')
    }
  }

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
  }, [frequency,addRecord, selectedDate,editable, type, category, setAllTransactions,deleted])

  return (
    <Layout>
      <div className='flex flex-col sm:flex-row justify-between p-5 shadow-md items-center bg-purple-300'>
        <div className='flex flex-col sm:flex-row gap-3 sm:gap-5'>
          <div>
            <h6 className="text-white">Select Frequency</h6>
            <Select value={frequency} onChange={(values) => setFrequency(values)} className="w-full sm:w-32">
              <Select.Option value='7'>Last 1 Week</Select.Option>
              <Select.Option value='30'>Last 1 Month</Select.Option>
              <Select.Option value='365'>Last 1 Year</Select.Option>
              <Select.Option value='custom'>Custom</Select.Option>
            </Select>
            {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />}
          </div>
          <div>
            <h6 className="text-white">Select Type</h6>
            <Select value={type} onChange={(values) => setType(values)} className="w-full sm:w-28">
              <Select.Option value='all'>All</Select.Option>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>
            </Select>
          </div>
          <div>
            <h6 className="text-white">Select Category</h6>
            <Select value={category} onChange={(values) => setCategory(values)} className="w-full sm:w-28">
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
          <div className='flex items-center gap-4 px-2 '>
            <UnorderedListOutlined className={`text-xl ${viewData === 'table' ? 'text-white' : 'text-gray-400'}`} onClick={() => setViewData('table')} />
            <AreaChartOutlined className={`text-xl ${viewData === 'analytics' ? 'text-white' : 'text-gray-400'}`} onClick={() => setViewData('analytics')} />
          </div>
        </div>
        <button className='bg-purple-700 text-white py-1 px-2 rounded-lg hover:bg-purple-500 sm:py-2 sm:px-4 md:py-3 md:px-6 lg:py-3 lg:px-6' onClick={() => setShowModal(true)}>Add New</button>
      </div>

      {viewData === 'table' ?
        <Table columns={columns} dataSource={allTransactions} rowKey={(record) => record._id} /> :
        <Analytics allTransactions={allTransactions} />
      }

      <Modal title={editable ? 'Edit Transaction' : 'Add Transaction'}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form layout='vertical' onFinish={handleSubmit} initialValues={editable}>
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
            <button type='submit' className='bg-purple-500 text-white py-1 px-2 rounded-lg'>SAVE</button>
          </div>
        </Form>
      </Modal>
    </Layout>
  )
}

export default HomePage
