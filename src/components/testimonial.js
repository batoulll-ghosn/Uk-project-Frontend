import React, { useState } from 'react';
import './styles/testimonial.css'

const TestimonialItem = ({ text, name }) => (
 <div>
   <p className='testimoniage'>{text}</p>
   <div className='testi-line-and-name'> 
        <hr className='testi-line'/>
        <p className='name-testi'>{name}</p>
   </div>
  
 </div>
);

const TestimonialComponent = () => {
 const [activePosition, setActivePosition] = useState(0);

 const elements = [
     { id: 1, content: <TestimonialItem text={`I recently completed a language course and I'm thrilled to share my experience.
     The course was comprehensive, engaging, and well-structured, covering various aspects of the language.
      The instructors were dedicated and passionate, making learning a joyful experience.
       Interacting with native speakers during the course was a highlight, providing practical language usage.
       `} name='Lucetta' />, circle: <span className="dot"></span> },
     { id: 2, content: <TestimonialItem text={`Cultural elements were integrated into the course, 
     enhancing my understanding of the language's origins and nuances. 
     Overall, I highly recommend this language course to anyone seeking to learn a new language`} name='Marshall' />, circle: <span className="dot"></span> },
     { id: 3, content: <TestimonialItem text={`I recently completed a language course and I'm deeply grateful for the transformative experience. The course was structured to engage all aspects of language learning, and the instructors were truly dedicated. Their unique teaching style and constant encouragement made learning a joyful journey.`} name='Noah' />, circle: <span className="dot"></span> },
 ];

 return (
    <div className='main-in-testimlonial'>
            <div className='left-in-testimlonial'>
                <h1 className='header-in-testimonial'>People Say About Us</h1>
                <div className="container">
        {elements.map((element, position) => (
        <div key={element.id} className={position === activePosition ? 'element active' : 'element'}>
            {element.content}
        </div>
        ))}
        
        <div className="dots-container">
        <div className="dots">
            {elements.map((element, position) => (
            <span key={element.id} className={position === activePosition ? 'dot active' : 'dot'} onClick={() => setActivePosition(position)}></span>
            ))}
        </div>
        </div>
        </div></div>
            <div  className='right-in-testimlonial'><img src='./images/man.png'/></div>
    </div>
 
 );
}

export default TestimonialComponent;
