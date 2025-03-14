import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* About Us Content */}
        <div className="max-w-4xl mx-auto mt-6">
          <h1 className="text-4xl font-bold text-blue-900 mb-8">About ExpenseTracker</h1>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              At ExpenseTracker, we believe that financial freedom starts with understanding your spending habits. 
              Our mission is to provide individuals and businesses with powerful yet simple tools to manage their finances effectively.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We're committed to helping you achieve your financial goals through smart expense tracking, 
              insightful analytics, and practical budgeting tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Why Choose Us?</h3>
              <ul className="space-y-3 text-gray-600">
                <li>✓ User-friendly interface</li>
                <li>✓ Secure data protection</li>
                <li>✓ Real-time tracking</li>
                <li>✓ Detailed analytics</li>
                <li>✓ Mobile responsive</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Our Values</h3>
              <ul className="space-y-3 text-gray-600">
                <li>✓ Transparency</li>
                <li>✓ User Privacy</li>
                <li>✓ Innovation</li>
                <li>✓ Reliability</li>
                <li>✓ Customer Success</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/register"
              className="inline-block px-8 py-3 mb-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs; 