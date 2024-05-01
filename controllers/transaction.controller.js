import {transaction} from '../models/transaction.model.js'

const getAllTransactions = async (req,res) =>{
    try{
        const transactions = await transaction.find({userid:req.body.userid})
        res.status(200).json({
            success:true,
            transactions
        })
    } catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

const addTransaction = async (req,res) =>{
    try{
        const newTransaction = new transaction(req.body)
        console.log(newTransaction)
        await newTransaction.save()
        res.status(201).json({
            success:true,
            newTransaction
        })
    } catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

export{
    getAllTransactions,
    addTransaction,
}