import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatbotApp.css'; // For additional custom CSS

const ChatMessage = ({ message, isUser }) => (
  <div className={`d-flex ${isUser ? 'justify-content-end' : 'justify-content-start'} mb-2`}>
    <div className={`p-2 rounded ${isUser ? 'bg-primary text-white' : 'bg-light text-dark'}`}>
      {message}
    </div>
  </div>
);

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex mt-3">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="form-control"
        placeholder="Type your message..."
      />
      <button type="submit" className="btn btn-primary ms-2">
        Send
      </button>
    </form>
  );
};

const ChatbotApp = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // For controlling popup visibility

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async (message) => {
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessages(prev => [...prev, { text: data.response, isUser: false }]);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to get response from the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <button
        className=" rounded-pills btn btn-success chatbot-toggle-btn "
        onClick={toggleChatbot}
      >
        <i className="bi bi-chat-dots"></i> Ai Assistant
      </button>

      {isOpen && (
        <div className="chatbot-container">
          <div className="card">
            <div className="card-header d-flex justify-content-between">
              <h5 className="mb-0">ELMS  AI Assistant</h5>

              <button className="btn btn-danger btn-sm" onClick={toggleChatbot}>
                X
              </button>
            </div>
            <div className="card-body" id="message-container" style={{ height: '300px', overflowY: 'auto' }}>
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message.text} isUser={message.isUser} />
              ))}
              {isLoading && <div className="text-center">Loading...</div>}
              {error && <div className="text-danger text-center">{error}</div>}
            </div>
            <div className="card-footer">
              <ChatInput onSendMessage={sendMessage} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotApp;
