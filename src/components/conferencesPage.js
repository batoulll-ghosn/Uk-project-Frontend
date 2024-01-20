import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllConferences, engageToConference } from './actions/conference';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {getUserID} from '../Data/getData';
import { useNavigate } from 'react-router-dom';
import './styles/header.css';
import './styles/scroll.css';
const Conferences = () => {
  const navigate = useNavigate();
  const conferences = useSelector((state) => state.conferences);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllConferences());
  }, [getAllConferences]);

  const parseDate = (input) => {
    const [day, month, year] = input.split('/');
    return new Date(`${month}/${day}/${year}`);
  };

  const compareDates = (a, b) => parseDate(a.date) - parseDate(b.date);
  conferences.sort(compareDates);

  const now = new Date();
  const pastConferences = conferences.filter((conference) => parseDate(conference.date) <= now);
  const upcomingConferences = conferences.filter((conference) => parseDate(conference.date) > now);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedConference, setSelectedConference] = useState(null);

  const openPopup = (conference) => {
    setSelectedConference(conference);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedConference(null);
  };

  const handleRegisterYes = async () => {
    const userId = getUserID();
    if (userId >= 1) {
    if (selectedConference) {
     
      const userMail = sessionStorage.getItem('email');
      const emailData = {
        email: userMail,
        content: `Registration for ${selectedConference.name} - ${selectedConference.description}. Price: ${selectedConference.price}`,
      };
      switch (selectedConference.abv) {
        case "con":
          try {
            const userId = getUserID();
            dispatch(engageToConference(selectedConference.id, userId));
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
    }} else {
      navigate('/Login'); 
      toast.error('You need to login first!')
  }
    setShowPopup(false);
   };
   const handleViewDetails = () => {
    if (selectedConference) {
      switch (selectedConference.abv) {
        case "con":
         navigate(`/conference/${selectedConference.id}`)
          break;
        case "co":
          navigate(`/course/${selectedConference.id}`)
          break;
          case "w":
            navigate(`/workshop/${selectedConference.id}`)
          break;
        default:
          break;
      }
      
    }
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
          <h2 className="the-Our-Conferences">Our Conferences</h2>
        </div>
      </div>
      <div className="main-container-conference">
        <h2 className="the-heading-in-conferences">Upcoming Conferences</h2>
        <div className="conferences-container">
          {upcomingConferences.map((conference, index) => (
            <div key={index} className="conference-card" onClick={() => openPopup(conference)}>
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
        <h2 className="the-heading-in-conferences">Past Conferences</h2>
        <div className="conferences-container">
          {pastConferences.map((conference, index) => (
            <div key={index} className="conference-card" onClick={() => openPopup(conference)}>
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
      {showPopup && selectedConference && (
        <div className="Confoverlay">
          <div className="Conferencepopup">
            <div className="Conferencepopup-content">
            <div className="titleandclose">   <p>{`Do you want to Register?`}</p> <button  onClick={closePopup}>&#10005;</button></div>
            <h2>{selectedConference.conference_name}</h2>
              <p>{selectedConference.description}</p>
              <p>{selectedConference.price}</p>
              <div className="buttonsOfConfPopup">
                <button className="left-side-of-header-button" onClick={handleRegisterYes}>
                  Yes
                </button>
                <button className='left-side-of-header-button' onClick={handleViewDetails} >View More Details</button>
           
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Conferences;
