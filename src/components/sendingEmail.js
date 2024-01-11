import React, { useState } from 'react';
import axios from 'axios';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/email/send', {
        email,
        message,
      });

      setResponse(response.data);
    } catch (error) {
      console.error('Error sending email:', error);
      setResponse({
        success: false,
        message: 'Unable to send email',
        error: error.message,
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <label>Message:</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
        <br />
        <button type="submit">Send Email</button>
      </form>

      {response && (
        <div>
          <p>{response.message}</p>
          {response.error && <p>Error: {response.error}</p>}
        </div>
      )}
    </div>
  );
};

export default EmailForm;
