import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-teal-800">
      {/* Header */}
      <header className="bg-blue-900/50 backdrop-blur-sm fixed w-full z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">ExpenseTracker</div>
          <Link
            to="/login"
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold text-white mb-6">
              Smart Expense Management for Modern Life
            </h1>
            <p className="text-teal-100 text-lg mb-8">
              Take control of your finances with our intuitive expense tracking solution.
              Monitor spending, create budgets, and achieve your financial goals.
            </p>
            <div className="space-x-4">
              <Link
                to="/register"
                className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg inline-block transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg inline-block transition-all duration-300 transform hover:scale-105"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
            <div className="space-y-4">
              <FeatureItem icon="📊" title="Expense Analytics" description="Visualize your spending patterns with interactive charts" />
              <FeatureItem icon="🎯" title="Budget Planning" description="Set and track budgets for different categories" />
              <FeatureItem icon="📱" title="Easy Access" description="Track expenses anytime, anywhere with our responsive design" />
              <FeatureItem icon="🔒" title="Secure" description="Your financial data is protected with industry-standard security" />
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900/50 backdrop-blur-sm py-8">
        <div className="container mx-auto px-6">
          <div className="text-center text-teal-100">
            <p>&copy; 2024 ExpenseTracker. All rights reserved.</p>
            <p className="mt-2 text-sm text-teal-200">
              Designed and developed by Deev Savla
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureItem = ({ icon, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="text-2xl">{icon}</div>
    <div>
      <h3 className="text-white font-semibold mb-1">{title}</h3>
      <p className="text-teal-100 text-sm">{description}</p>
    </div>
  </div>
);

export default LandingPage; 