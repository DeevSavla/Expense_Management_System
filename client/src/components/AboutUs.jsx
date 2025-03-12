import React from 'react';
import Layout from '../Layout';

function AboutUs() {
  return (
    <Layout>
      <div className='min-h-screen bg-gradient-to-b from-purple-50 to-white py-16 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-16'>
            <h1 className='text-4xl font-bold text-purple-800 mb-4'>About Us</h1>
            <div className='w-24 h-1 bg-purple-500 mx-auto rounded-full mb-8'></div>
            <p className='text-xl text-gray-600 leading-relaxed mb-12'>
              Welcome to our Expense Management System! We are dedicated to helping you take control of your finances
              with our powerful and user-friendly platform.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            <div className='bg-white p-8 rounded-2xl shadow-lg'>
              <h2 className='text-2xl font-semibold text-purple-700 mb-4'>Our Mission</h2>
              <p className='text-gray-600 leading-relaxed'>
                We strive to provide the most intuitive and efficient expense tracking solution,
                helping individuals and businesses manage their finances with confidence and ease.
              </p>
            </div>

            <div className='bg-white p-8 rounded-2xl shadow-lg'>
              <h2 className='text-2xl font-semibold text-purple-700 mb-4'>Our Values</h2>
              <ul className='space-y-3 text-gray-600'>
                <li className='flex items-center'>
                  <span className='w-2 h-2 bg-purple-500 rounded-full mr-3'></span>
                  Transparency
                </li>
                <li className='flex items-center'>
                  <span className='w-2 h-2 bg-purple-500 rounded-full mr-3'></span>
                  Reliability
                </li>
                <li className='flex items-center'>
                  <span className='w-2 h-2 bg-purple-500 rounded-full mr-3'></span>
                  User Privacy
                </li>
                <li className='flex items-center'>
                  <span className='w-2 h-2 bg-purple-500 rounded-full mr-3'></span>
                  Innovation
                </li>
              </ul>
            </div>
          </div>

          <div className='mt-16 bg-white p-8 rounded-2xl shadow-lg'>
            <h2 className='text-2xl font-semibold text-purple-700 mb-4'>Why Choose Us?</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <div className='flex items-start'>
                <div className='flex-shrink-0'>
                  <div className='w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center'>
                    <svg className='w-6 h-6 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                    </svg>
                  </div>
                </div>
                <div className='ml-4'>
                  <h3 className='text-lg font-medium text-gray-900'>Easy to Use</h3>
                  <p className='mt-2 text-gray-600'>Intuitive interface that makes expense tracking a breeze.</p>
                </div>
              </div>
              <div className='flex items-start'>
                <div className='flex-shrink-0'>
                  <div className='w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center'>
                    <svg className='w-6 h-6 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 10V3L4 14h7v7l9-11h-7z'></path>
                    </svg>
                  </div>
                </div>
                <div className='ml-4'>
                  <h3 className='text-lg font-medium text-gray-900'>Real-time Analytics</h3>
                  <p className='mt-2 text-gray-600'>Get instant insights into your spending patterns.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AboutUs; 