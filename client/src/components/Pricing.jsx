import React from 'react';

function Pricing() {
  return (
    <div className='min-h-screen bg-white flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold mb-4'>Pricing</h1>
      <div className='text-lg text-center max-w-2xl'>
        <p>Basic Plan: $10/month</p>
        <p>Pro Plan: $20/month</p>
        <p>Enterprise Plan: Contact us for pricing</p>
      </div>
    </div>
  );
}

export default Pricing; 