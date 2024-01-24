import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Users from './users';
import {Link} from 'react-router-dom';
import '../styles/dashboard2.css';
import Courses from './coursesPage';
import Workshops from './workshopsPage';
import Conferences from './ConferencesPage';
import Schedule from './Schedule';
import Payment from './Payment';
import Reviews from './reviews';
import OverView from './overView';
import { toast } from 'react-toastify';
function Dashboard() {
    const [activePage, setActivePage] = useState('users');

    const handleMenuClick = (page) => {
        setActivePage(page);
    };
    const navigate = useNavigate();
    const handleLogout = () => {
        
       sessionStorage.clear();
       localStorage.clear();
        
        navigate('/');
        toast.success('Logout was done successfully!')
    }


    return (
        <div className="menu-and-content">
          
            <div className="menu">
                <div className="menu-content">
                    <div className='llctop'>
                    <div className='div-of-logo-in-footer'><Link to='/'><img src='./images/logo.jpeg'/></Link></div>
                        
                    </div>
                    <div className="menu-item">
                        <a href="#users" onClick={() => handleMenuClick('users')}>Users</a>
                    </div>
                    <div className="menu-item">
                        <a href="#courses" onClick={() => handleMenuClick('courses')}>Courses</a>
                    </div>
                    <div className="menu-item">
                        <a href="#workshops" onClick={() => handleMenuClick('workshops')}>Workshops</a>
                    </div>
                    <div className="menu-item">
                        <a href="#conf" onClick={() => handleMenuClick('conf')}>Conferences</a>
                    </div>
                    <div className="menu-item">
                        <a href="#schedule" onClick={() => handleMenuClick('schedule')}>Schedule</a>
                    </div>
                    <div className="menu-item">
                        <a href="#payment" onClick={() => handleMenuClick('payment')}>Payment</a>
                    </div>
                    <div className="menu-item">
                        <a href="#reviews" onClick={() => handleMenuClick('reviews')}>Reviews</a>
                    </div>
                    <div className="menu-item">
                        <a href="#analytics" onClick={() => handleMenuClick('analytics')}>Analytics</a>
                    </div>
                    
                </div>
            </div>
            <div id="content" style={{ flex: 1}}>
            <div className='the-header-in-conferences'>
               
                <div className='the-Our-Conferencess'><h2>Welcome Super Admin!</h2></div>
                <div className="button-logout-31">
                        <button className='logout-in-dashboard' onClick={handleLogout}>Logout</button>
                </div>
                </div>
                {activePage === 'users' && <Users />}
                {activePage === 'courses' && <Courses />}
                {activePage === 'workshops' && <Workshops />}
                {activePage === 'conf' && <Conferences />}
                {activePage === 'schedule' && <Schedule />}
                {activePage === 'payment' && <Payment />}
                {activePage === 'reviews' && <Reviews/>}
                {activePage === 'analytics' && <OverView/>}
            </div>
        </div>
    );
}

export default Dashboard;