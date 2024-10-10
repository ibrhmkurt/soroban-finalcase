import React, { useState } from 'react';

export default function App() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isWalletConnected) {
      // Placeholder for actual payment logic
      setResult(`Payment of ${amount} sent to ${recipient}`);
    } else {
      setResult('Please connect your wallet');
    }
  };

  const handleConnectWallet = () => {
    // Placeholder for actual wallet connection logic
    setIsWalletConnected(true);
    setResult('Wallet connected successfully');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-4">Soroban Payment dApp</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Recipient Address"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full p-2 border rounded"
        />
        <button 
          type="submit" 
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send Payment
        </button>
      </form>
      {!isWalletConnected && (
        <button 
          onClick={handleConnectWallet}
          className="mt-4 w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Connect Wallet
        </button>
      )}
      {result && <p className="mt-4 text-sm text-gray-600">{result}</p>}
    </div>
  );
}