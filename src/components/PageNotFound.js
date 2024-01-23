import React, { useState } from 'react';
import './styles/pageNotFound.css';
import { useNavigate } from 'react-router-dom';
const PageNotFound = () => {
    const navigate = useNavigate();
    const GoTo = (event) =>{
        event.preventDefault();
       navigate('/');
       }

  return (
    <>
    <div className='not-found-div'>
        <h1 className='o404-title'>404</h1>
        <p className='o404-text'>Page Not Found</p>
        <button className='left-side-of-header-button' onClick={GoTo}>Go Back To Website</button>
  </div> 
   </>
  );
};

export default PageNotFound;
