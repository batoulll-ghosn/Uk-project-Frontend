import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getConferenceById } from './actions/conference';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/scroll.css';
import Footer from './footer';
import {getUserID} from '../Data/getData';
import { engageToConference } from './actions/conference';
const Conferences = () => {
  const { id } = useParams();
  const conferences = useSelector((state) => state.conferences);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);


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
  const handleRegisterYes = async () => {
    const userId = getUserID();
    if (userId >= 1) {
    if (conferences) {
     
      const userMail = sessionStorage.getItem('email');
      const emailData = {
        email: userMail,
        content: `Registration for ${conferences.name} - ${conferences.description}. Price: ${conferences.price}`,
      };
      switch (conferences.abv) {
        case "con":
          try {
            
            dispatch(engageToConference(conferences.id, userId));
            toast.success("Successfully registered to the Conference!");
            setShowPopup(false);
          } catch (error) {
            toast.error("Failed to register to the Conference!");
            setShowPopup(false);
          }
          break;
       
        default:
          break;
      }
      const response = await fetch('https://ukbackendproject.onrender.com/email/registerToConf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }
    }} 
    
    else {
      navigate('/Login'); 
      toast.error('You need to login first!')
  }
   
   };
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getConferenceById(id));
  }, [dispatch, id]);

  return (
    <>
      {conferences && (
        <>
          <div className="the-header-in-conferences">
            <div className="div-of-logo-in-footer">
              <Link to="/">
                <img src="../images/logo.jpeg" alt="Logo" />
              </Link>
            </div>
            <div>
              <h2 className="the-Our-Conferences">{conferences.conference_name}</h2>
            </div>
          </div>
       
            
           
            <div key={conferences.id} className="ConferencePage" >
              <div className="ConferencePageimg" ><img src={conferences.img}/></div>
                <div className="conference-side">
                  <h2 className="header-in-thee-slide">About</h2>
                  <p>Translation and language conferences in the United Kingdom are renowned platforms for professionals to come together to discuss, share, and learn about the latest trends, techniques, and developments in the field. These conferences provide a space for networking, knowledge exchange, and skill enhancement among professionals who are passionate about languages and translation.</p>
                  <p>{conferences.description}</p>
                  <p>One of the key objectives of these conferences is to foster collaboration and dialogue among professionals from different parts of the world. This helps to stimulate innovation and promote best practices in the field of translation and languages.

                    Overall, these conferences play a crucial role in shaping the future of translation and languages in the UK. They provide a platform for professionals to learn from each other, share their experiences, and contribute to the ongoing development of these fields</p>
                  <p className="textt-in-thee-slide">Date: {conferences.date}</p>
                  <p className="header-in-thee-slide">{conferences.price}</p>
                  <div className='buttonsOfConfPopup'><button className='left-side-of-header-button' onClick={handleRegisterYes}>Register</button></div>
                </div>
              </div>
         
              <div className='the-main-div-in-footer'>
      <div className='first-div-in-footer'>
        <div className='div-of-logo-in-footer'><img src='../images/logo.jpeg'/></div>
        <p className='the-text-in-footer'>include audio and video for each 
course include audio and video</p>
        <div className='the-follow-us-div'><h2 className='the-follow-us'>Follow Us</h2><div className='social-media'>
  <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
    <img className="icons-in-footer" src='../images/fb.svg' alt='Facebook' />
  </a>
  <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'>
    <img className="icons-in-footer" src='../images/linkedin.svg' alt='LinkedIn' />
  </a>
  <a href='https://web.telegram.org/' target='_blank' rel='noopener noreferrer'>
    <img className="icons-in-footer" src='../images/telegram.svg' alt='Telegram' />
  </a>
</div>

        </div>
      </div>
      <div className='second-div-in-footer'>
        <ul className='the-ul-in-the-footer'>  <li className='text-nnnf'><Link to='/'>Home</Link></li>
        <li className='text-nnnf'><Link to='/workshops'>Workshops</Link></li>
        <li className='text-nnnf'><Link to='/conferences'>Conferences</Link></li>
        <li className='text-nnnf'><Link to='/courses'>Courses</Link></li>
        <li className='text-nnnf'><Link to='/contactUs'>Contact Us</Link></li>
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
        </>
      )}
    </>
  );
};

export default Conferences;
