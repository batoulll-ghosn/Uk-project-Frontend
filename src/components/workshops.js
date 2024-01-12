import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWorkshops, engageToWorkshop } from './actions/workshop';
import { toast } from 'react-toastify';

const Workshops = () => {
  const workshops = useSelector((state) => state.workshops);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllWorkshops());
  }, [dispatch]);

  const handleRegisterYes = async () => {
    try {
      const userId = localStorage.getItem('userId');
      await dispatch(engageToWorkshop(selectedWorkshop.id, userId));

      toast.success('Successfully registered for the Workshop!');

      const userMail = localStorage.getItem('email');
      const emailData = {
        email: userMail,
        content: `Registration for ${selectedWorkshop.workshopname}. Price: ${selectedWorkshop.price}`,
      };

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
    } catch (error) {
      console.error(error);
      toast.error('Failed to register for the Workshop!');
    }

    closePopup();
  };

  const openPopup = (workshop) => {
    setSelectedWorkshop(workshop);
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
      {showPopup && selectedWorkshop && (
        <div className="Confoverlay">
          <div className="Conferencepopup">
            <div className="Conferencepopup-content">
              <p>{`Do you want to Register?`}</p>
              <h2>{selectedWorkshop.workshopname}</h2>
              <p>{selectedWorkshop.description}</p>
              <p>{selectedWorkshop.price}</p>
              <div className="buttonsOfConfPopup">
                <button className="left-side-of-header-button" onClick={handleRegisterYes}>
                  Yes
                </button>
                <button className="left-side-of-header-button" onClick={closePopup}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Workshops;
