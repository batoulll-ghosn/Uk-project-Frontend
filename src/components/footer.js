import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './styles/footer.css';
import {Link} from 'react-router-dom';
const Footer=()=> {
  const sendEmail = (event) => {
    event.preventDefault();
   
    emailjs.sendForm('service_5api68s', 'template_48xehxg', event.target, 'WLsRl9iNnyhoX9wI5')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
   
    event.target.reset();
   }
   
  return (
    <div className='the-main-div-in-footer'>
      <div className='first-div-in-footer'>
        <div className='div-of-logo-in-footer'><img src='./images/logo.jpeg'/></div>
        <p className='the-text-in-footer'>include audio and video for each 
course include audio and video</p>
        <h2 className='the-follow-us'>Follow Us</h2>
      </div>
      <div className='second-div-in-footer'>
        <ul className='the-ul-in-the-footer'><li><Link to='/'>Home</Link></li>
        <li><Link to='/workshops'>Workshops</Link></li>
        <li><Link to='/conferences'>Conferences</Link></li>
        <li><Link to='/courses'>Courses</Link></li>
        </ul>
      </div>
      <div className='third-div-in-footer'><h2 className='the-follow-us'>Let's Keep in Touch!</h2>
       <p className='the-text-in-footer'>include audio and video for each 
course include audio and video</p>
<form onSubmit={sendEmail} className='the-subscribe-form-in-footer'>
 <input type='email' name='user_email' placeholder='Your Email' className='the-email-button'/>
 <button type='submit' className='the-subscribe-button'>Subscribe</button>
</form>

      </div>
    </div>
  );
}

export default Footer;
