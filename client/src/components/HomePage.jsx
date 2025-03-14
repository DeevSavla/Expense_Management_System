import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { Modal, Form, Input, Select, message, Table, DatePicker, Card, Statistic } from 'antd'
import axios from 'axios'
import moment from 'moment'
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined, ArrowUpOutlined, ArrowDownOutlined, DashboardOutlined } from '@ant-design/icons'
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
      <div className='bg-gradient-to-r from-blue-50 to-blue-100 p-4 sm:p-6 rounded-xl shadow-md mb-6 border border-blue-200'>
        <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full lg:w-auto'>
            <div className='w-full sm:w-auto'>
              <h6 className="text-white font-semibold mb-2">Select Frequency</h6>
              <Select value={frequency} onChange={(values) => setFrequency(values)} 
                     className="w-full sm:w-40" style={{ borderRadius: '8px' }}>
                <Select.Option value='7'>Last 1 Week</Select.Option>
                <Select.Option value='30'>Last 1 Month</Select.Option>
                <Select.Option value='365'>Last 1 Year</Select.Option>
                <Select.Option value='custom'>Custom</Select.Option>
              </Select>
              {frequency === 'custom' && (
                <div className="mt-2">
                  <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} 
                             className="w-full" style={{ borderRadius: '8px' }} />
                </div>
              )}
            </div>
            <div className='w-full sm:w-auto'>
              <h6 className="text-white font-semibold mb-2">Select Type</h6>
              <Select value={type} onChange={(values) => setType(values)} 
                     className="w-full sm:w-32" style={{ borderRadius: '8px' }}>
                <Select.Option value='all'>All</Select.Option>
                <Select.Option value='income'>Income</Select.Option>
                <Select.Option value='expense'>Expense</Select.Option>
              </Select>
            </div>
            <div className='w-full sm:w-auto'>
              <h6 className="text-white font-semibold mb-2">Select Category</h6>
              <Select value={category} onChange={(values) => setCategory(values)} 
                     className="w-full sm:w-36" style={{ borderRadius: '8px' }}>
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
          <div className='flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end'>
            <div className='flex gap-4'>
              <DashboardOutlined 
                className={`text-xl sm:text-2xl cursor-pointer transition-colors duration-200 ${viewData === 'dashboard' ? 'text-blue-600' : 'text-blue-400 hover:text-blue-600'}`}
                onClick={() => setViewData('dashboard')}
              />
              <UnorderedListOutlined 
                className={`text-xl sm:text-2xl cursor-pointer transition-colors duration-200 ${viewData === 'table' ? 'text-blue-600' : 'text-blue-400 hover:text-blue-600'}`}
                onClick={() => setViewData('table')}
              />
              <AreaChartOutlined 
                className={`text-xl sm:text-2xl cursor-pointer transition-colors duration-200 ${viewData === 'analytics' ? 'text-blue-600' : 'text-blue-400 hover:text-blue-600'}`}
                onClick={() => setViewData('analytics')}
              />
            </div>
            <button 
              className='bg-blue-500 text-white py-2 px-4 sm:px-6 rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium text-sm sm:text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
              onClick={() => setShowModal(true)}
            >
              Add New
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className='bg-white rounded-xl shadow-md p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-blue-100'>
        {viewData === 'table' ? (
          <Table 
            columns={columns} 
            dataSource={allTransactions} 
            rowKey={(record) => record._id}
            className="rounded-lg overflow-hidden border border-blue-500"
            pagination={{
              className: "px-4",
              showSizeChanger: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
            }}
          />
        ) : (
          <Analytics allTransactions={allTransactions} />
        )}
      </div>

      {/* Transaction Modal */}
      <Modal 
        title={
          <span className="text-lg sm:text-xl font-medium text-blue-800">
            {editable ? 'Edit Transaction' : 'Add Transaction'}
          </span>
        }
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
        className="rounded-lg"
        width={600}
      >
        <Form 
          layout='vertical' 
          onFinish={handleSubmit} 
          initialValues={editable}
          className="mt-4"
        >
          <Form.Item label='Amount' name='amount'>
            <Input type='text' className="rounded-lg" placeholder="Enter amount" />
          </Form.Item>
          <Form.Item label='Type' name='type'>
            <Select className="rounded-lg">
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='Category' name='category'>
            <Select className="rounded-lg">
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
            <Input type='date' className="rounded-lg" />
          </Form.Item>
          <Form.Item label='Reference' name='reference'>
            <Input className="rounded-lg" placeholder="Enter reference" />
          </Form.Item>
          <Form.Item label='Description' name='description'>
            <Input className="rounded-lg" placeholder="Enter description" />
          </Form.Item>
          <div className="flex justify-end">
            <button type='submit' className='bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-semibold'>
              {editable ? 'Update' : 'Add'}
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  )
}

export default HomePage
