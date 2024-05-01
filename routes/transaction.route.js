import express from 'express'
import { addTransaction, getAllTransactions } from '../controllers/transaction.controller.js'

const transactionRouter = express.Router()

transactionRouter.post('/add-transaction',addTransaction)
transactionRouter.post('/get-transaction',getAllTransactions)

export default transactionRouter
