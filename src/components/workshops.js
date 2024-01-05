import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './styles/services.css';

const Workshops=()=> {

  return (
    <div className='main-div-of-serviess'>
    <div className='left-side-of-services'><img src='./images/workshops.png'/></div>
    <div className='right-side-of-servicess'><h2>Check Our Free Workshops</h2>
    <p>include audio and video for each course include audio and video for each course include audio and video for each course
       include audio and video for each course include audio and video for each course  </p>
       <button className='left-side-of-work-button'>Check Now</button>
       </div>
    
</div>
  );
}

export default Workshops;
