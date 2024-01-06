import React, { useState, useEffect } from "react";
import './styles/scroll.css';
function ScrollingBackground() {
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
  <div style={{
    background: `
      linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
      url(./images/Our-Services.jpg)
    `,
    backgroundPositionY: offsetY,
    backgroundAttachment: 'unset',
    height: 'fit-content',
    width: '100%',
    paddingTop:'5%',
    paddingRight:'2%',
    paddingLeft:'2%',
    paddingBottom:'5%',
    textAlign:'center',
    color:'white'
  }}>
     <div className="first-div-in-scroll"><h2 className="heading-in-scroll">What kind of Services   Our Platform  offers?</h2>
      <h3>Welcome to the United Kingdom, a vibrant and dynamic hub of learning and education! Nestled in the heart of Europe, the United Kingdom is renowned for its rich history, diverse culture, and world-class academic institutions. With a legacy of academic excellence that spans centuries, the UK stands as a beacon for learners from around the globe.

        In this educational haven, a plethora of courses, conferences, and workshops await eager minds, offering an unparalleled opportunity to delve into various fields of study. The United Kingdom is home to some of the most prestigious universities and colleges globally, where innovation, research, and academic rigor are the cornerstones of education.</h3>
        <p>✓ include audio and video for each course include audio and video for each course include audio and video for each course
           include audio and video for each course  </p>
           <p> ✓ include audio and video for each course include audio and video for each course include audio and video for each course
           include audio and video for each course  </p>
           <p> ✓ include audio and video for each course include audio and video for each course include audio and video for each course
           include audio and video for each course  </p>
        
      </div>
  </div>
 );
}

export default ScrollingBackground;
