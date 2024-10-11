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
      // Convert amount to BigInt safely
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="Recipient Address"
        required
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
      />
      <input
        type="text"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
        placeholder="Token ID"
        required
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Payment Message"
        required
      />
      <button type="submit">Send Payment</button>
    </form>
  );
}

export default PaymentForm;