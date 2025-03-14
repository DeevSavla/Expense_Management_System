import React from 'react';
import { Progress } from 'antd';

const Analytics = ({ allTransactions }) => {

    // Categories
    const categories = [
        'salary',
        'food',
        'entertainment',
        'education',
        'medical',
        'tax',
        'rent',
        'bills',
        'other'
    ];

    // Total transactions
    const totalTransactions = allTransactions.length;
    const totalIncomeTransactions = allTransactions.filter(transaction => transaction.type === 'income').length;
    const totalExpenseTransactions = allTransactions.filter(transaction => transaction.type === 'expense').length;
    const totalIncomePercent = (totalIncomeTransactions / totalTransactions) * 100;
    const totalExpensePercent = (totalExpenseTransactions / totalTransactions) * 100;

    // Total turnover
    const totalTurnover = allTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalIncomeTurnover = allTransactions.filter(transaction => transaction.type === 'income').reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExpenseTurnover = allTransactions.filter(transaction => transaction.type === 'expense').reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100;
    const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100;

    return (
        <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-white p-6 rounded-xl">
            {/* Total Transactions Analytics */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                <h4 className="text-2xl font-semibold text-blue-900 mb-4">Transaction Analytics</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Income vs Expense Count */}
                    <div>
                        <h6 className="text-lg font-medium text-blue-800 mb-3">Income vs Expense Count</h6>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-blue-600">Income</span>
                                    <span className="text-sm text-blue-600">{totalIncomeTransactions}</span>
                                </div>
                                <Progress 
                                    percent={totalIncomePercent.toFixed(0)}
                                    strokeColor="#2563EB"
                                    trailColor="#DBEAFE"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-red-600">Expense</span>
                                    <span className="text-sm text-red-600">{totalExpenseTransactions}</span>
                                </div>
                                <Progress 
                                    percent={totalExpensePercent.toFixed(0)}
                                    strokeColor="#DC2626"
                                    trailColor="#FEE2E2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Income vs Expense Turnover */}
                    <div>
                        <h6 className="text-lg font-medium text-blue-800 mb-3">Income vs Expense Turnover</h6>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-blue-600">Income</span>
                                    <span className="text-sm text-blue-600">₹{totalIncomeTurnover}</span>
                                </div>
                                <Progress 
                                    percent={totalIncomeTurnoverPercent.toFixed(0)}
                                    strokeColor="#2563EB"
                                    trailColor="#DBEAFE"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-red-600">Expense</span>
                                    <span className="text-sm text-red-600">₹{totalExpenseTurnover}</span>
                                </div>
                                <Progress 
                                    percent={totalExpenseTurnoverPercent.toFixed(0)}
                                    strokeColor="#DC2626"
                                    trailColor="#FEE2E2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Analytics */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-2xl font-semibold text-blue-900 mb-4">Category Analytics</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category Wise Income */}
                    <div>
                        <h6 className="text-lg font-medium text-blue-800 mb-3">Category Wise Income</h6>
                        {categories.map((category) => {
                            const amount = allTransactions
                                .filter((t) => t.type === 'income' && t.category === category)
                                .reduce((acc, t) => acc + t.amount, 0);
                            return amount > 0 ? (
                                <div key={category} className="mb-4">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium text-blue-600 capitalize">{category}</span>
                                        <span className="text-sm text-blue-600">₹{amount}</span>
                                    </div>
                                    <Progress 
                                        percent={((amount / totalIncomeTurnover) * 100).toFixed(0)}
                                        strokeColor="#2563EB"
                                        trailColor="#DBEAFE"
                                    />
                                </div>
                            ) : null;
                        })}
                    </div>

                    {/* Category Wise Expense */}
                    <div>
                        <h6 className="text-lg font-medium text-blue-800 mb-3">Category Wise Expense</h6>
                        {categories.map((category) => {
                            const amount = allTransactions
                                .filter((t) => t.type === 'expense' && t.category === category)
                                .reduce((acc, t) => acc + t.amount, 0);
                            return amount > 0 ? (
                                <div key={category} className="mb-4">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium text-red-600 capitalize">{category}</span>
                                        <span className="text-sm text-red-600">₹{amount}</span>
                                    </div>
                                    <Progress 
                                        percent={((amount / totalExpenseTurnover) * 100).toFixed(0)}
                                        strokeColor="#DC2626"
                                        trailColor="#FEE2E2"
                                    />
                                </div>
                            ) : null;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
