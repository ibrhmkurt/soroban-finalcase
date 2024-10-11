import React, { useState, useEffect } from 'react';
import { viewAllMessages } from '../utils/soroban';

function MessageList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const allMessages = await viewAllMessages();
        setMessages(allMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <h2>Payment Messages</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default MessageList;