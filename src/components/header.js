import React, { useState } from 'react';
import './styles/header.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import './styles/navbar.css';
const Header=()=> {
  const navigate = useNavigate();
  const GoToCourses = (event) =>{
    event.preventDefault();
   navigate('/courses');
   }
   const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const GoToLogin = (event) => {
    event.preventDefault();
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      navigate('/dash');
    } else {
      navigate('/login');
    }
  }
  return (
  <div className='hero-header'> 
    <div className={`header-main ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className='first-row'>
        <img className='header-first-row-logo' src='./images/logo.png' alt='Logo' />
        <div className='first-row-second-part'>
          <button className='burger-menu' onClick={toggleMenu}>
            {isMenuOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
          </button>
          <div className={`navbar ${isMenuOpen ? 'show-menu' : ''}`}>
            <ul className='ul-in-the-navbar'>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/workshops'>Workshops</Link></li>
              <li><Link to='/conferences'>Conferences</Link></li>
              <li><Link to='/courses'>Courses</Link></li>
            </ul>
            <button className='join-us-button' onClick={GoToLogin}>
              {sessionStorage.getItem('userId') ? 'Profile' : 'Join Us'}
            </button>
          </div>
        </div>
      </div>
      <div className='header-back' >
       <div className='left-side-of-header'><h1>Learn And Cooperate</h1>
       <p>Find the best online and On-site Courses, Workshops and Conferences</p>
       <button className='left-side-of-header-button' onClick={GoToCourses}>Explore Courses</button></div>
       <div className='right-side-of-header'></div>
    </div>

    </div>
   
    </div>
   
  );
}

export default Header;
