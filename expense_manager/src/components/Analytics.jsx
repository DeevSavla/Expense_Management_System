import React from 'react';
import { Progress } from 'antd';

function Analytics({ allTransactions }) {

    const totalTransactions = allTransactions.length;
    const totalIncomeTransactions = allTransactions.filter(transaction => transaction.type === 'income').length;
    const totalExpenseTransactions = allTransactions.filter(transaction => transaction.type === 'expense').length;
    const totalIncomePercentage = (totalIncomeTransactions / totalTransactions) * 100;
    const totalExpensePercentage = (totalExpenseTransactions / totalTransactions) * 100;

    const totalTurnover = allTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalIncomeTurnover = allTransactions.filter(transaction => transaction.type === 'income').reduce(
        (acc, transaction) => acc + transaction.amount, 0
    );
    const totalExpenseTurnover = allTransactions.filter(transaction => transaction.type === 'expense').reduce(
        (acc, transaction) => acc + transaction.amount, 0
    );
    const incomeTurnoverPercentage = (totalIncomeTurnover / totalTurnover) * 100;
    const expenseTurnoverPercentage = (totalExpenseTurnover / totalTurnover) * 100;

    const categories = [
        'salary', 'tip', 'emi', 'food', 'movie', 'bills', 'medical', 'fee', 'tax',
    ];

    if (totalTransactions > 0) {

        return (
            <>
                <div className='p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-center'>
                    <div className='border border-purple-900 p-4 md:p-6 bg-purple-100'>
                        <div className="bg-gray-200 mb-4 py-2 px-4 rounded">
                            <div className="text-black">Total Transactions: {totalTransactions}</div>
                        </div>
                        <div>
                            <h5 className='text-green-800 mb-2'>Income: {totalIncomeTransactions}</h5>
                            <h5 className='text-red-500 mb-2'>Expense: {totalExpenseTransactions}</h5>
                            <div className='flex gap-4'>
                                <Progress type='circle' strokeColor={'green'} percent={totalIncomePercentage.toFixed(0)} />
                                <Progress type='circle' strokeColor={'red'} percent={totalExpensePercentage.toFixed(0)} />
                            </div>
                        </div>
                    </div>
                    <div className='border border-purple-900 p-4 md:p-6 bg-purple-100'>
                        <div className="bg-gray-200 mb-4 py-2 px-4 rounded">
                            <div className="text-black">Total Turnover: {totalTurnover}</div>
                        </div>
                        <div>
                            <h5 className='text-green-800 mb-2'>Income: {totalIncomeTurnover}</h5>
                            <h5 className='text-red-500 mb-2'>Expense: {totalExpenseTurnover}</h5>
                            <div className='flex gap-4'>
                                <Progress type='circle' strokeColor={'green'} percent={incomeTurnoverPercentage.toFixed(0)} />
                                <Progress type='circle' strokeColor={'red'} percent={expenseTurnoverPercentage.toFixed(0)} />
                            </div>
                        </div>
                    </div>
                    <div className='border border-purple-900 p-4 md:p-6 bg-purple-100'>
                        <div>
                            <h6 className="text-black">Categorywise Income</h6>
                            {categories.map((category) => {
                                const amount = allTransactions
                                    .filter((transaction) => transaction.type === 'income' && transaction.category === category)
                                    .reduce((acc, transaction) => acc + transaction.amount, 0);
                                return (
                                    amount > 0 &&
                                    <div key={category}>
                                        <h5>{category}</h5>
                                        <Progress percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className='border border-purple-900 p-4 md:p-6 bg-purple-100'>
                        <div>
                            <h6 className="text-black">Categorywise Expense</h6>
                            {categories.map((category) => {
                                const amount = allTransactions
                                    .filter((transaction) => transaction.type === 'expense' && transaction.category === category)
                                    .reduce((acc, transaction) => acc + transaction.amount, 0);
                                return (
                                    amount > 0 &&
                                    <div key={category}>
                                        <h5>{category}</h5>
                                        <Progress percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </>
        );
    } else {
        return (<></>);
    }
}

export default Analytics;
