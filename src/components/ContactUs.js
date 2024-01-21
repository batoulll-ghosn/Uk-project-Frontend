import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from './footer';
import './styles/contactUs.css';

const Course = () => {
  const [message, setMessage] = useState('Hello, React!');
  const { id } = useParams();

  return (
    <>
      <div className='contactUsMainSection'>
        <div className='sideOfText'>
          <h2 className='header-in-contact-us'>CONTACT US</h2>

          <div className='columnOfContent'>
            <div>
              <h3 className='title-in-contact'>ADDRESS</h3>
              <p className='text-in-contact'><a href='https://maps.app.goo.gl/Ls1AcPDtLUqFWZgNA' target='_blank' rel='noopener noreferrer'>
              
             London: 71-75 Shelton Street </a> </p>
              <p className='text-in-contact'><a href='https://maps.app.goo.gl/Ls1AcPDtLUqFWZgNA' target='_blank' rel='noopener noreferrer'>
              
             Covent Garden, London WC2H 9JQ </a> </p>
           
            
            </div>
            <div>
              <h3 className='title-in-contact'>Phone Number</h3>
              <p className='text-in-contact'>
               
                <a href='tel:+96171413425'>+961 71 413 425 </a>
              </p>
              <p className='text-in-contact'>
              
                <a href='tel:+441664791021'>+44 1664 79 1021</a>
              </p>
            </div>
            <div>
              <h3 className='title-in-contact'>Email </h3>
              
              <p className='text-in-contact'>
                <a href='mailto:unitedkingdomforeduandtr@gmail.com'>unitedkingdomforeduandtr@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
        <div className='sideOfImg'>
        <a href='https://maps.app.goo.gl/Ls1AcPDtLUqFWZgNA' target='_blank' rel='noopener noreferrer'>
              
             <img style={{ width: '100%' }} src='./images/contactUs.jpeg' alt='Contact Us' />
          </a>
          </div>
      </div>

      <Footer />
    </>
  );
};

export default Course;
