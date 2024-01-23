import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWorkshops, engageToWorkshop } from './actions/workshop';
import { toast } from 'react-toastify';
import { getUserID } from '../Data/getData';
import './styles/header.css';

const Workshops = () => {
  const workshops = useSelector((state) => state.workshops);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedConference, setSelectedConference] = useState(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllWorkshops());
  }, [dispatch]);

  const handleRegisterYes = async () => {
    const userId = getUserID();
    if (userId >= 1) {
      if (selectedConference) {
        if (isPastWorkshop(selectedConference.date)) {
          setShowPopup(true);
          return;
        }

        const userMail = sessionStorage.getItem('email');
        const emailData = {
          email: userMail,
          content: `Registration for ${selectedConference.workshopname} - launched at ${selectedConference.date}. Price: ${selectedConference.price}`,
        };

        switch (selectedConference.abv) {
          case 'co':
            try {
              const userId = getUserID();
              dispatch(engageToWorkshop(selectedConference.id, userId));
              toast.success('Successfully registered to the Workshop!');
              setShowPopup(false);
            } catch (error) {
              toast.error('Failed to register to the Workshop!');
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
      }
    } else {
      navigate('/Login');
      toast.error('You need to login first!');
    }

    setShowPopup(false);
  };

  const isPastWorkshop = (date) => {
    const workshopDate = new Date(date);
    const currentDate = new Date();
    return workshopDate < currentDate;
  };

  const handleViewDetails = () => {
    if (selectedConference) {
      switch (selectedConference.abv) {
        case 'con':
          navigate(`/conference/${selectedConference.id}`);
          break;
        case 'co':
          navigate(`/course/${selectedConference.id}`);
          break;
        case 'w':
          navigate(`/workshop/${selectedConference.id}`);
          break;
        default:
          break;
      }
    }
  };

  const openPopup = (workshop) => {
    setSelectedConference(workshop);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
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
          <h2 className="the-Our-Conferences">Our Workshops</h2>
        </div>
      </div>
      <div className="conferences-container">
        <div className="main-container-conference">
          <div className="conferences-container">
            {workshops.map((workshop, index) => (
              <div key={index} className="conference-card" onClick={() => openPopup(workshop)}>
                <img className="img-in-thee-slide" src={workshop.img} alt="Workshop Image" />
                <div className="dddt">
                  <h2 className="header-in-thee-slidee">{workshop.workshopname}</h2>
                  <p className="text-in-thee-slidee">Date: {workshop.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showPopup && selectedConference && (
        <div className="Confoverlay">
          <div className="Conferencepopup">
            <div className="Conferencepopup-content">
              <div className="titleandclose">
                <p>{isPastWorkshop(selectedConference.date) ? "Ooopss it's an already done workshop you can't register!" : 'Do you want to Register?'}</p>
                <button onClick={closePopup}>&#10005;</button>
              </div>
              <h2 className='text-in-workshop-popup'>{selectedConference.workshopname}</h2>
              <p>{selectedConference.price}</p>
              <div className='buttonsOfConfPopup'>
                <button className='left-side-of-header-button' onClick={handleRegisterYes}>Yes</button>
                <button className='left-side-of-header-button' onClick={handleViewDetails}>View More Details</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Workshops;
