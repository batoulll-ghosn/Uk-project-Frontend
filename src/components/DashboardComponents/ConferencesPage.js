import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllConferences } from '../actions/conference';
import {Link} from 'react-router-dom';
const Conferences = () => {
 const conferences = useSelector((state) => state.conferences);
 const dispatch = useDispatch();

 useEffect(() => {
 dispatch(getAllConferences());
 }, []);

 const parseDate = (input) => {
  const [day, month, year] = input.split("/");
  return new Date(`${month}/${day}/${year}`);
 };

 const compareDates = (a, b) => parseDate(a.date) - parseDate(b.date);
 conferences.sort(compareDates);

 const now = new Date();
 const pastConferences = conferences.filter(conference => parseDate(conference.date) <= now);
 const upcomingConferences = conferences.filter(conference => parseDate(conference.date) > now);

 return (
<>

<div className='main-container-conference'>
<h2 className='the-heading-in-conferences'>Upcoming Conferences</h2>
 <div className="conferences-container">
 
  {upcomingConferences.map((conference, index) => (
    <div key={index} className="conference-card">
      <img className='img-in-thee-slide' src={conference.img} alt={conference.conference_name} />
      <div className='dddt'>
        <h2 className='header-in-thee-slide'>{conference.conference_name}</h2>
        <p className='text-in-thee-slide'>{conference.type}</p>
        <p className='textt-in-thee-slide'>{conference.description}</p>
        <p className='textt-in-thee-slide'>Date: {conference.date}</p>
        <p className='header-in-thee-slide'>{conference.price}</p>
      </div>
    </div>
  ))}
 </div>  
 <h2 className='the-heading-in-conferences'>Past Conferences</h2>
 <div className="conferences-container">

  {pastConferences.map((conference, index) => (
    <div key={index} className="conference-card">
      <img className='img-in-thee-slide' src={conference.img} alt={conference.conference_name} />
      <div className='dddt'>
        <h2 className='header-in-thee-slide'>{conference.conference_name}</h2>
        <p className='text-in-thee-slide'>{conference.type}</p>
        <p className='textt-in-thee-slide'>{conference.description}</p>
        <p className='textt-in-thee-slide'>Date: {conference.date}</p>
        <p className='header-in-thee-slide'>{conference.price}</p>
      </div>
    </div>
  ))}
 </div>
 </div>
 </>
 );
}

export default Conferences;
