import {transaction} from '../models/transaction.model.js'
import moment from 'moment'

const getAllTransactions = async (req,res) =>{
    try{
        const {frequency,selectedDate,type,category} = req.body
        const transactions = await transaction.find({
            ...(frequency !== 'custom' ? {
                date:{
                    $gt:moment().subtract(Number(frequency),'d').toDate(),
                },
            }:{
                date:{
                    $gte:selectedDate[0],
                    $lte:selectedDate[1]
                }
            }),
            userid:req.body.userid,
            ...(type!=='all' && {type}),
            ...(category!=='all' && {category}),
        })

        res.status(200).json({
            success:true,
            transactions
        })
    } catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

const editTransaction = async (req,res)=>{
    try{
        await transaction.findOneAndUpdate({_id:req.body.transactionId},req.body.payload)
        console.log(req.body.payload)
        res.status(200).send('Edit successfully')
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

const deleteTransaction = async (req, res) => {
    try {
      await transaction.findOneAndDelete({ _id: req.body.transacationId });
      res.status(200).send("Transaction Deleted!");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

export{
    getAllTransactions,
    addTransaction,
    editTransaction,
    deleteTransaction
}