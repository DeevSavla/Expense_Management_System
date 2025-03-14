import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { Modal, Form, Input, Select, message, Table, DatePicker, Card, Statistic } from 'antd'
import axios from 'axios'
import moment from 'moment'
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined, ArrowUpOutlined, ArrowDownOutlined, DashboardOutlined, PlusOutlined } from '@ant-design/icons'
import { baseUrl } from '../utilities/baseUrl'
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
  const [statistics, setStatistics] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netBalance: 0
  })

  // Calculate statistics whenever transactions change
  useEffect(() => {
    calculateStatistics();
  }, [allTransactions]);

  // Function to calculate statistics
  const calculateStatistics = () => {
    const totalIncome = allTransactions
      .filter(transaction => transaction.type === 'income')
      .reduce((acc, transaction) => acc + Number(transaction.amount), 0);

    const totalExpense = allTransactions
      .filter(transaction => transaction.type === 'expense')
      .reduce((acc, transaction) => acc + Number(transaction.amount), 0);

    const netBalance = totalIncome - totalExpense;

    setStatistics({
      totalIncome,
      totalExpense,
      netBalance
    });
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span className="font-medium">{moment(text).format('YYYY-MM-DD')}</span>,
      align: 'center',
      className: 'bg-purple-50'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      align: 'center',
      className: 'bg-purple-50',
      render: (text) => <span className="font-medium">₹{text}</span>
    },
    {
      title: 'Type',
      dataIndex: 'type',
      align: 'center',
      className: 'bg-purple-50',
      render: (text) => (
        <span className={`px-3 py-1 rounded-full ${text === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {text.charAt(0).toUpperCase() + text.slice(1)}
        </span>
      )
    },
    {
      title: 'Category',
      dataIndex: 'category',
      align: 'center',
      className: 'bg-purple-50',
      render: (text) => <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">{text.charAt(0).toUpperCase() + text.slice(1)}</span>
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
      align: 'center',
      className: 'bg-purple-50'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      align: 'center',
      className: 'bg-purple-50'
    },
    {
      title: 'Actions',
      render: (record) => (
        <div className="flex justify-center space-x-3">
          <EditOutlined className="text-blue-500 text-xl hover:text-blue-700 cursor-pointer" onClick={() => {
            setEditable(record)
            setShowModal(true)
          }} />
          <DeleteOutlined className="text-red-500 text-xl hover:text-red-700 cursor-pointer" onClick={() => {
            handleDelete(record);
          }} />
        </div>
      ),
      align: 'center',
      className: 'bg-purple-50'
    }
  ]

  const handleDelete = async (record) => {
    try {
      setDeleted((e)=>!e)
      await axios.post(`${baseUrl}/transactions/delete-transaction`, {
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
        await axios.post(`${baseUrl}/transactions/edit-transaction`, {
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
        await axios.post(`${baseUrl}/transactions/add-transaction`, { ...values, userid: getUser.findUser._id })
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
      const res = await axios.post(`${baseUrl}/transactions/get-transaction`, { userid: getUser.findUser._id, frequency, selectedDate, type, category })
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
      {/* Top Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        <Card className="bg-gradient-to-r from-blue-100 to-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <Statistic
            title={<span className="text-blue-800 opacity-90 text-sm sm:text-base font-medium">Total Income</span>}
            value={statistics.totalIncome}
            valueStyle={{ color: '#1e40af' }}
            prefix={<><span className="text-blue-800">₹</span><ArrowUpOutlined className="text-green-600 ml-1" /></>}
          />
        </Card>
        <Card className="bg-gradient-to-r from-red-50 to-red-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <Statistic
            title={<span className="text-blue-800 opacity-90 text-sm sm:text-base font-medium">Total Expenses</span>}
            value={statistics.totalExpense}
            valueStyle={{ color: '#1e40af' }}
            prefix={<><span className="text-blue-800">₹</span><ArrowDownOutlined className="text-red-600 ml-1" /></>}
          />
        </Card>
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
          <Statistic
            title={<span className="text-blue-800 opacity-90 text-sm sm:text-base font-medium">Net Balance</span>}
            value={statistics.netBalance}
            valueStyle={{ color: '#1e40af' }}
            prefix={<span className="text-blue-800">₹</span>}
          />
        </Card>
      </div>

      {/* Filters Section */}
      <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-white p-6 rounded-xl mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <h6 className="text-sm font-medium text-blue-900 mb-2">Select Frequency</h6>
            <Select
              value={frequency}
              onChange={(values) => setFrequency(values)}
              className="w-full"
            >
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">Custom Range</Select.Option>
            </Select>
          </div>
          {frequency === 'custom' && (
            <div>
              <h6 className="text-sm font-medium text-blue-900 mb-2">Select Range</h6>
              <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />
            </div>
          )}
          <div>
            <h6 className="text-sm font-medium text-blue-900 mb-2">Select Type</h6>
            <Select value={type} onChange={(values) => setType(values)} className="w-full">
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </div>
          <div>
            <h6 className="text-sm font-medium text-blue-900 mb-2">Select Category</h6>
            <Select value={category} onChange={(values) => setCategory(values)} className="w-full">
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="entertainment">Entertainment</Select.Option>
              <Select.Option value="education">Education</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
              <Select.Option value="rent">Rent</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Statistic
            title={<span className="text-blue-900 font-medium">Total Income</span>}
            value={statistics.totalIncome}
            prefix="₹"
            valueStyle={{ color: '#2563EB' }}
          />
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Statistic
            title={<span className="text-blue-900 font-medium">Total Expenses</span>}
            value={statistics.totalExpense}
            prefix="₹"
            valueStyle={{ color: '#DC2626' }}
          />
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Statistic
            title={<span className="text-blue-900 font-medium">Net Balance</span>}
            value={statistics.netBalance}
            prefix="₹"
            valueStyle={{ color: statistics.netBalance >= 0 ? '#059669' : '#DC2626' }}
          />
        </Card>
      </div>

      {/* View Switcher */}
      <div className="flex justify-end mb-4 space-x-4">
        <div
          className={`cursor-pointer p-3 rounded-lg transition-all duration-200 ${
            viewData === 'table'
              ? 'bg-blue-600 text-white'
              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
          }`}
          onClick={() => setViewData('table')}
        >
          <UnorderedListOutlined className="text-xl" />
        </div>
        <div
          className={`cursor-pointer p-3 rounded-lg transition-all duration-200 ${
            viewData === 'analytics'
              ? 'bg-blue-600 text-white'
              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
          }`}
          onClick={() => setViewData('analytics')}
        >
          <AreaChartOutlined className="text-xl" />
        </div>
      </div>

      {/* Add Transaction Button */}
      <div className="flex justify-end mb-4">
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
          onClick={() => setShowModal(true)}
        >
          <span>Add Transaction</span>
          <PlusOutlined />
        </button>
      </div>

      {/* Table/Analytics View */}
      <div className="bg-white rounded-xl shadow-lg">
        {viewData === 'table' ? (
          <Table columns={columns} dataSource={allTransactions} className="rounded-xl overflow-hidden" />
        ) : (
          <Analytics allTransactions={allTransactions} />
        )}
      </div>

      {/* Transaction Modal */}
      <Modal
        title={editable ? 'Edit Transaction' : 'Add Transaction'}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable}
        >
          <Form.Item
            label={<span className="text-blue-900">Amount</span>}
            name="amount"
            rules={[{ required: true, message: 'Please input amount!' }]}
          >
            <Input type="number" className="rounded-lg" prefix="₹" />
          </Form.Item>
          <Form.Item
            label={<span className="text-blue-900">Type</span>}
            name="type"
            rules={[{ required: true, message: 'Please select type!' }]}
          >
            <Select className="w-full rounded-lg">
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={<span className="text-blue-900">Category</span>}
            name="category"
            rules={[{ required: true, message: 'Please select category!' }]}
          >
            <Select className="w-full rounded-lg">
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="entertainment">Entertainment</Select.Option>
              <Select.Option value="education">Education</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
              <Select.Option value="rent">Rent</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={<span className="text-blue-900">Date</span>}
            name="date"
            rules={[{ required: true, message: 'Please select date!' }]}
          >
            <DatePicker className="w-full rounded-lg" format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            label={<span className="text-blue-900">Reference</span>}
            name="reference"
            rules={[{ required: true, message: 'Please input reference!' }]}
          >
            <Input type="text" className="rounded-lg" />
          </Form.Item>
          <Form.Item
            label={<span className="text-blue-900">Description</span>}
            name="description"
            rules={[{ required: true, message: 'Please input description!' }]}
          >
            <Input type="text" className="rounded-lg" />
          </Form.Item>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              {editable ? 'Update' : 'Add'}
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  )
}

export default HomePage
