import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import './styles/navbar.css';

const NavBar=()=> {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
 const GoToLogin = (event) =>{
  event.preventDefault();
 navigate('/login');
 }
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
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/workshops'>Workshops</Link></li>
              <li><Link to='/conferences'>Conferences</Link></li>
              <li><Link to='/courses'>Courses</Link></li>
            </ul>
            <button className='join-us-button' onClick={GoToLogin}>Join Us</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
