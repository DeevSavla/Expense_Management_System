import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-blue-900">ExpenseTracker</h1>
              <div className="hidden md:flex space-x-6">
                <Link
                  to="/about"
                  className="text-blue-800 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  About Us
                </Link>
                <Link
                  to="/pricing"
                  className="text-blue-800 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  Pricing
                </Link>
              </div>
            </div>
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

        {/* Hero Section */}
        <div className="sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-blue-900 leading-tight">
                Smart Expense Management for Better Financial Control
              </h1>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Take control of your finances with our intuitive expense tracking solution. 
                Monitor your spending, set budgets, and make informed financial decisions.
              </p>
              <div className="mt-8 space-x-4">
                <Link
                  to="/register"
                  className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
                <Link
                  to="/about"
                  className="inline-block px-8 py-3 text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  Learn More →
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="space-y-6">
                  {/* Dashboard Preview */}
                  <div className="relative">
                    <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-100 rounded-full opacity-50"></div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-semibold text-blue-900 mb-3">Smart Dashboard</h3>
                      <p className="text-gray-600 mb-4">Interactive charts and real-time insights to visualize your finances.</p>
                      <div className="h-2 w-3/4 bg-blue-100 rounded-full mb-2"></div>
                      <div className="h-2 w-1/2 bg-green-100 rounded-full mb-2"></div>
                      <div className="h-2 w-1/3 bg-red-100 rounded-full"></div>
                    </div>
                  </div>

                  {/* Mobile Access */}
                  <div className="relative">
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-green-100 rounded-full opacity-50"></div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-semibold text-blue-900 mb-3">Mobile Access</h3>
                      <p className="text-gray-600 mb-4">Track expenses on the go with our responsive design.</p>
                      <div className="flex space-x-2">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600">📱</span>
                        </div>
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600">💻</span>
                        </div>
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600">🖥️</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Smart Categories */}
                  <div className="relative">
                    <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-100 rounded-full opacity-50"></div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-semibold text-blue-900 mb-3">Smart Categories</h3>
                      <p className="text-gray-600 mb-4">Automatically categorize and organize your transactions.</p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-blue-50 p-2 rounded-lg text-center">
                          <span className="text-sm text-blue-600">Food</span>
                        </div>
                        <div className="bg-green-50 p-2 rounded-lg text-center">
                          <span className="text-sm text-green-600">Travel</span>
                        </div>
                        <div className="bg-purple-50 p-2 rounded-lg text-center">
                          <span className="text-sm text-purple-600">Bills</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <div className="">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Easy Tracking',
                description: 'Track your expenses with just a few clicks. Categorize and organize your spending effortlessly.'
              },
              {
                title: 'Smart Analytics',
                description: 'Get insights into your spending patterns with detailed analytics and visual reports.'
              },
              {
                title: 'Secure & Private',
                description: 'Your financial data is encrypted and stored securely. Your privacy is our top priority.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="py-8 border-t border-blue-100">
          <div className="text-center text-gray-600">
            <p>© 2024 ExpenseTracker. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage; 