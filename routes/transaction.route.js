import express from 'express'
import { addTransaction, getAllTransactions,editTransaction,deleteTransaction } from '../controllers/transaction.controller.js'

const transactionRouter = express.Router()

transactionRouter.post('/add-transaction',addTransaction)
transactionRouter.post('/get-transaction',getAllTransactions)
transactionRouter.post('/edit-transaction',editTransaction)
transactionRouter.post("/delete-transaction", deleteTransaction);

export default transactionRouter
