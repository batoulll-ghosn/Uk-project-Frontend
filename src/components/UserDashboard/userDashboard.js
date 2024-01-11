import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllEnngagedConferences } from '../actions/conference';
import { Link } from 'react-router-dom';

const Conferences = () => {
 const conferences = useSelector((state) => state.conferences);
 const dispatch = useDispatch();
 const userId = localStorage.getItem('userId');
 const [selectedConference, setSelectedConference] = useState(null);

 useEffect(() => {
   dispatch(getAllEnngagedConferences(userId));
 }, [userId, dispatch]);

 const parseDate = (input) => {
   const [day, month, year] = input.split('/');
   return new Date(`${month}/${day}/${year}`);
 };

 const compareDates = (a, b) => parseDate(a.date) - parseDate(b.date);
 conferences.sort(compareDates);

 const now = new Date();
 const pastConferences = conferences.filter((conference) => parseDate(conference.date) <= now);
 const upcomingConferences = conferences.filter((conference) => parseDate(conference.date) > now);

 const handleConferenceClick = (conference, isPast) => {
   setSelectedConference({...conference, isPast});
 };

 const handleClosePopup = () => {
   setSelectedConference(null);
 };

 return (
   <>
     <div className="the-header-in-conferences">
       <div className="div-of-logo-in-footer">
         <Link to="/">
           <img src="./images/logo.jpeg" alt="Logo" />
         </Link>
       </div>
       <div>
         <h2 className="the-Our-Conferencess">Welcome to your dashboard!</h2>
       </div>
       <div className="person-icon" > <img src="./images/person-icon.svg"/></div>
     </div>
     <div className="main-container-conference">
       <h2 className="the-heading-in-conferences">Upcoming Conferences</h2>
       <div className="conferences-container">
         {upcomingConferences.map((conference, index) => (
           <div key={index} className="conference-card" onClick={() => handleConferenceClick(conference, false)}>
             <img className="img-in-thee-slide" src={conference.img} alt={conference.conference_name} />
             <div className="dddt">
               <h2 className="header-in-thee-slide">{conference.conference_name}</h2>
               <p className="text-in-thee-slide">{conference.type}</p>
               <p className="textt-in-thee-slide">{conference.description}</p>
               <p className="textt-in-thee-slide">Date: {conference.date}</p>
               <p className="header-in-thee-slide">{conference.price}</p>
               <p className='registered-in-green'>Registered</p>
             </div>
           </div>
         ))}
       </div>
       <h2 className="the-heading-in-conferences">Past Conferences</h2>
       <div className="conferences-container">
         {pastConferences.map((conference, index) => (
           <div key={index} className="conference-card" onClick={() => handleConferenceClick(conference, true)}>
            <img className="img-in-thee-slide" src={conference.img} alt={conference.conference_name} />
             <div className="dddt">
               <h2 className="header-in-thee-slide">{conference.conference_name}</h2>
               <p className="text-in-thee-slide">{conference.type}</p>
               <p className="textt-in-thee-slide">{conference.description}</p>
               <p className="textt-in-thee-slide">Date: {conference.date}</p>
               <p className="header-in-thee-slide">{conference.price}</p>
             </div>
           </div>
         ))}
       </div>
     </div>
     {selectedConference && (
       <div className="Confoverlay">
         <div className="Conferencepopup">
          <div className='Conferencepopup-content'><span className="close" onClick={handleClosePopup}>
             &times;
           </span>
           <h2>{selectedConference.conference_name}</h2>
           <p>Type: {selectedConference.type}</p>
           <p>Description: {selectedConference.description}</p>
           <p>Date: {selectedConference.date}</p>
           <p>Price: {selectedConference.price}</p>
           {selectedConference.isPast ? (
             <p>Resources: {selectedConference.resources}</p>
           ) : (
             <p>Zoom Link: {selectedConference.zoom_link}</p>
           )}</div>
           
         </div>
       </div>
     )}
   </>
 );
};

export default Conferences;
