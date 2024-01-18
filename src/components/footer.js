import React, { useState } from 'react';
import './styles/footer.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
const Footer=()=> {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const response = await axios.post('https://ukbackendproject.onrender.com/email/send', {
        email,
        message,
      });
   
      setResponse(response.data);
      setEmail(''); 
    } catch (error) {
      console.error('Error sending email:', error);
      setResponse({
        success: false,
        message: 'Unable to send email',
        error: error.message,
      });
    }
   };
   
   
  return (
    <div className='the-main-div-in-footer'>
      <div className='first-div-in-footer'>
        <div className='div-of-logo-in-footer'><img src='./images/logo.jpeg'/></div>
        <p className='the-text-in-footer'>include audio and video for each 
course include audio and video</p>
        <div className='the-follow-us-div'><h2 className='the-follow-us'>Follow Us</h2><div className='social-media'>
  <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
    <img className="icons-in-footer" src='./images/fb.svg' alt='Facebook' />
  </a>
  <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'>
    <img className="icons-in-footer" src='./images/linkedin.svg' alt='LinkedIn' />
  </a>
  <a href='https://web.telegram.org/' target='_blank' rel='noopener noreferrer'>
    <img className="icons-in-footer" src='./images/telegram.svg' alt='Telegram' />
  </a>
</div>

        </div>
      </div>
      <div className='second-div-in-footer'>
        <ul className='the-ul-in-the-footer'><li><Link to='/'>Home</Link></li>
        <li><Link to='/workshops'>Workshops</Link></li>
        <li><Link to='/conferences'>Conferences</Link></li>
        <li><Link to='/courses'>Courses</Link></li>
        
        </ul>
      </div>
      <div className='third-div-in-footer'><h2 className='the-follow-us'>Let's Keep in Touch!</h2>
       <p className='the-text-in-footer'>Subscribe , looking forward to see you a part of our community!</p>
<form onSubmit={handleSubmit} className='the-subscribe-form-in-footer'>
 <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Your Email' className='the-email-button'/>
 <button type='submit' className='the-subscribe-button'>Subscribe</button>
</form>

      </div>
    </div>
  );
}

export default Footer;
