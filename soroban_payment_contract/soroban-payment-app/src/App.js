import React, { useState, useEffect } from 'react';
import PaymentForm from './components/PaymentForm';
import MessageList from './components/MessageList';
import { connectWallet } from './utils/soroban';
import './App.css';

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [publicKey, setPublicKey] = useState('');

  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        const connectedPublicKey = await connectWallet();
        setPublicKey(connectedPublicKey);
        setWalletConnected(true);
      } catch (error) {
        console.error('Wallet connection error:', error);
      }
    };

    checkWalletConnection();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Soroban Payment App</h1>
        {walletConnected ? (
          <p>Connected: {publicKey}</p>
        ) : (
          <p>Please connect your Freighter wallet</p>
        )}
      </header>
      <main>
        <PaymentForm />
        <MessageList />
      </main>
    </div>
  );
}

export default App;