/* global BigInt */  // Declare BigInt as a global variable for ESLint

import React, { useState } from 'react';
import { makePayment } from '../utils/soroban';

function PaymentForm() {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bigIntAmount = BigInt(amount);
      const result = await makePayment(to, bigIntAmount, tokenId, message);
      console.log('Payment result:', result);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error('Payment error:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 space-y-6">
      <div className="space-y-4">
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Recipient Address"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="text"
          value={amount}
          onChange={(e) => {
            // Ensure only valid numeric input is accepted
            if (/^\d*$/.test(e.target.value)) {
              setAmount(e.target.value);
            }
          }}
          placeholder="Amount"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="text"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          placeholder="Token ID"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Payment Message"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
        />
        <button 
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Send Payment
        </button>
      </div>
    </form>
  );
}

export default PaymentForm;