import React, { useState } from 'react';
import { useParams } from "react-router-dom";
const Course = () => {
  const [message, setMessage] = useState('Hello, React!');
  const { id } = useParams();
  return (
    <div>
      
      <img style ={{width:'100%'}}src='./images/contactUs.jpeg'/>
    
    </div>
  );
};

export default Course;
