import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './styles/services.css';


const Workshops=()=> {
  const [offsetY, setOffsetY] = useState(0);

 const handleScroll = () => {
  setOffsetY(window.pageYOffset);
 };

 useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
 }, []);
 return (
   <div className='main-div-of-serviess'  style={{ 
    background: `
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
    url(./images/istockphoto.jgp)`,
  backgroundPosition: "center",
  backgroundAttachment: 'unset',
  height: 'fit-content',
  width: '100%',
       }}>
     <div 
       className='left-side-of-servicess'
     
     />
     <div className='right-side-of-servicess'>
       <h2>Check Our Free Workshops</h2>
       <p>include audio and video for each course include audio and video for each course include audio and video for each course
          include audio and video for each course include audio and video for each course </p>
       <button className='left-side-of-work-button'>Check Now</button>
     </div>
   </div>
 );
}

export default Workshops;
