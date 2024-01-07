import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './styles/services.css';

const Workshops=()=> {

  return (
    <div className='main-div-of-serviess'>
    <div className='left-side-of-servicess'><div className='first-images-in-workshops'><img src='./images/workshop1.jpg'/><img src='./images/workshop2.jpg'/></div>
    <div className='first-images-in-workshops'><img src='./images/workshop3.jpg'/><img src='./images/workshop4.jpg'/></div></div>
    <div className='right-side-of-servicess'><h2>Check Our Free Workshops</h2>
    <p>include audio and video for each course include audio and video for each course include audio and video for each course
       include audio and video for each course include audio and video for each course  </p>
       <button className='left-side-of-work-button'>Check Now</button>
       </div>
    
</div>
  );
}

export default Workshops;