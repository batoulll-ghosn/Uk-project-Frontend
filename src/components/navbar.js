import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './styles/navbar.css';

const NavBar=()=> {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`header-main ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className='first-row'>
        <img className='header-first-row-logo' src='./images/logo.png' alt='Logo' />
        <div className='first-row-second-part'>
          <button className='burger-menu' onClick={toggleMenu}>
            {isMenuOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
          </button>
          <div className={`navbar ${isMenuOpen ? 'show-menu' : ''}`}>
            <ul className='ul-in-the-navbar'>
              <li>Home</li>
              <li>Workshops</li>
              <li>Conferences</li>
              <li>Courses</li>
            </ul>
            <button className='join-us-button'>Join Us</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
