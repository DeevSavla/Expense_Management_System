import React from 'react';
import { Link } from 'react-router-dom';

function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: '/month',
      features: [
        'Basic expense tracking',
        'Monthly reports',
        'Up to 50 transactions',
        'Email support',
        'Mobile access'
      ],
      buttonText: 'Get Started',
      recommended: false
    },
    {
      name: 'Pro',
      price: '₹299',
      period: '/month',
      features: [
        'Unlimited transactions',
        'Advanced analytics',
        'Custom categories',
        'Priority support',
        'Export data'
      ],
      buttonText: 'Try Pro',
      recommended: true
    },
    {
      name: 'Enterprise',
      price: '₹999',
      period: '/month',
      features: [
        'Multiple users',
        'Team collaboration',
        'API access',
        'Dedicated support',
        'Custom integration'
      ],
      buttonText: 'Contact Sales',
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-white">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="py-6">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-900">ExpenseTracker</Link>
            <div className="space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Register
              </Link>
            </div>
          </div>
        </nav>

        {/* Pricing Content */}
        <div className="max-w-7xl mx-auto mt-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-600">Choose the plan that works best for you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg p-8 ${
                  plan.recommended ? 'ring-2 ring-blue-500 transform scale-105' : ''
                }`}
              >
                {plan.recommended && (
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Recommended
                  </span>
                )}
                <h3 className="text-2xl font-bold text-blue-900 mt-4">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-blue-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    to="/register"
                    className={`w-full inline-flex justify-center py-3 px-6 rounded-lg text-white font-medium transition-all duration-200 ${
                      plan.recommended
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    {plan.buttonText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing; 