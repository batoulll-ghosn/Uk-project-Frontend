import React, { useState } from 'react';
import { useParams } from "react-router-dom";
const Workshop = () => {
  const [message, setMessage] = useState('Hello, React!');
  const { id } = useParams();
  return (
    <div>
      <h1>{message}</h1>
      <p>This is a Workshop</p>
      <p>{id}</p>
    </div>
  );
};

export default Workshop;