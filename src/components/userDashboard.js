import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllEnngagedConferences } from './actions/conference';
import { getScheduleOfCourse } from './actions/schedule';
import { AddReview } from './actions/review';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import { updateUserInfo } from './actions/user';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/header.css';
import {getUserID} from '../Data/getData';
const UserDashboard = () => {
  const navigate = useNavigate();
 const conferences = useSelector((state) => state.conferences);
 const schedule= useSelector((state) => state.schedules);
 const dispatch = useDispatch();
 const userId = getUserID();
 const [workshops,setWorkshops]=useState([])
 const [selectedConference, setSelectedConference] = useState(null);
 const [selectedWorkshop, setSelectedWorkshop] = useState(null);
 const emailFromLocalStorage = sessionStorage.getItem('email');
 const nameFromLocalStorage = sessionStorage.getItem('fullName');
 
 
 const [isAddReviewPopupOpen, setAddReviewPopupOpen] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({
    nameOftestemoniated: sessionStorage.getItem('fullName') || '', 
    description: '',
  });

  const handleAddReviewClick = () => {
    setAddReviewPopupOpen(true);
  };

  const handleCloseAddReviewPopup = () => {
    setAddReviewPopupOpen(false);
    setReviewFormData({
      nameOftestemoniated: sessionStorage.getItem('fullName') || '', 
      description: '',
    });
  };
  

  const handleReviewInputChange = (e) => {
    const { name, value } = e.target;
    setReviewFormData({
      ...reviewFormData,
      [name]: value,
    });
  };

  const handleAddReviewSubmit = (e) => {
    e.preventDefault();
    dispatch(AddReview(userId, reviewFormData));
    toast.success('Thank you for Review Submission!!')
    handleCloseAddReviewPopup();
  };

 const handleWorkshopClick = (workshop) => {
  setSelectedWorkshop(workshop);
};

const handleCloseWorkshopPopup = () => {
  setSelectedWorkshop(null);
};
 const parseDate = (input) => {
  const [day, month, year] = input.split('/');
  return new Date(`${month}/${day}/${year}`);
 };

 const compareDates = (a, b) => parseDate(a.date) - parseDate(b.date);
 conferences.sort(compareDates);

 const now = new Date();
 const pastConferences = conferences.filter((conference) => parseDate(conference.date) < now);
 const upcomingConferences = conferences.filter((conference) => parseDate(conference.date) >= now);
 

 const handleConferenceClick = (conference, isPast) => {
  setSelectedConference({...conference, isPast});
 };

 const handleClosePopup = () => {
  setSelectedConference(null);
 };
 const scheduleArray = Array.isArray(schedule) ? schedule : [];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const hours = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00","18:00","19:00","20:00"];

 
  const scheduleTable = Array.from({ length: days.length }, () =>
    Array.from({ length: hours.length }, () => [])
  );


  scheduleArray.forEach((event) => {
    const eventDayIndex = days.indexOf(event.day);
    const eventHourIndex = hours.indexOf(event.hour);

    if (eventDayIndex >= 0 && eventHourIndex >= 0) {
      scheduleTable[eventDayIndex][eventHourIndex].push(
        <div key={event.id}>
          <p>{event.languageName} {event.level}</p>
         <a href={event.zoom_link} target="_blank" rel="noopener noreferrer">Zoom Meeting Link</a>

        </div>
      );
    }
  });
  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    email:  emailFromLocalStorage || '',
    fullName: nameFromLocalStorage || '',
    password: '',
    confirmPassword: '',
    img: null, 
  });

  const handlePersonIconClick = () => {
    setProfilePopupOpen(true);
  };

  const handleCloseProfilePopup = () => {
    setProfilePopupOpen(false);
    setProfileFormData({
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
      img: null,
    });
  };

  const handleProfileInputChange = (e) => {
    const { name, value, type, files } = e.target;

  
    const inputValue = type === 'file' ? files[0] : value;

    setProfileFormData({
      ...profileFormData,
      [name]: inputValue,
    });
  };
  const handleSaveProfile = () => {
    try {
      dispatch(
        updateUserInfo(
          userId,
          profileFormData.fullName,
          profileFormData.email,
          profileFormData.oldPassword,
          profileFormData.newPassword
        )
      );
  
      toast.success('Profile updated successfully!');
      handleCloseProfilePopup();
    } catch (error) {
      
      toast.error('Failed to update profile!');
    }
  };
   const handleLogoutProfile = () => {
        sessionStorage.removeItem('fullName');
        sessionStorage.removeItem('email');
        localStorage.removeItem('token');
        navigate('/');
        toast.success('You Logged Out SuccessFully!')
  };
  const fetchWorkshops = async () => {
    try {
      const response = await axios.get(`https://ukbackendproject.onrender.com/workshops/getEngagedWorkshops/${userId}`);
   
      setWorkshops(response.data.data);
    } catch (error) {
     
    }
  };
  const upcomingWorkshops = workshops.filter((workshop) => parseDate(workshop.date) >= now);
  useEffect(() => {
    dispatch(getScheduleOfCourse(userId));
    dispatch(getAllEnngagedConferences(userId));
    fetchWorkshops();
   }, [userId, dispatch,handleSaveProfile]);
 return (
  <>
   <div className="the-header-in-conferences">
       <div className="div-of-logo-in-footer">
         <Link to="/">
           <img src="./images/logo.jpeg" alt="Logo" />
         </Link>
       </div>
       <div>
         <h2 className="the-Our-Conferencess">Welcome {nameFromLocalStorage}!</h2>
       </div>
       <div className="person-icon" onClick={handlePersonIconClick}> <img src='./images/settings.svg'/>
        <img src='./images/door-svgrepo-com.svg' onClick={handleLogoutProfile}/></div>
    
     </div>
     <div>
      <div className='afterEdit'>

      <button  onClick={handleAddReviewClick} className='left-side-of-header-buttonnnRRR'>
          + Add Review
        </button>
        <>
  {upcomingConferences.length > 0 ? (
    <div className="main-container-conferencee">
      <div>
        <h2 className="the-heading-in-conferences">Upcoming Conferences</h2>
        <div className="conferences-containerr">
          {upcomingConferences.map((conference, index) => (
            <div key={index} className="conference-cardd" onClick={() => handleConferenceClick(conference, false)}>
              <img className="img-in-thee-slide" src={conference.img} alt={conference.conference_name} />
              <div className="dddt">
                <h2 className="header-in-thee-slide">{conference.conference_name}</h2>
                <p className="text-in-thee-slide">{conference.type}</p>
                <p className="textt-in-thee-slide">Date: {conference.date}</p>
                <p className="registered-in-green">Registered</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : ( 
    <>
    <h2 className="the-heading-in-conferences">Upcoming Conferences</h2>
    <p className="text-in-thee-slide"> You most register to a conference to view it here!</p></>
  )}
</>

       
<>
  {pastConferences.length > 0 && (
    <div className="main-container-conferencee">
      <h2 className="the-heading-in-conferences">Past Conferences</h2>
      <div className="conferences-containerr">
        {pastConferences.map((conference, index) => (
          <div key={index} className="conference-cardd" onClick={() => handleConferenceClick(conference, true)}>
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
  )}
</>

      
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
   {upcomingWorkshops.length > 0 ? (
  <>
    <h2 className="the-heading-in-conferences">Workshops</h2>
    <div className="conferences-container">
      <div className="main-container-conference">
        <div className="conferences-container">
          {upcomingWorkshops.map((workshop, index) => (
            <div
              key={index}
              className="conference-cardd"
              onClick={() => handleWorkshopClick(workshop)}
            >
              <img className="img-in-thee-slide" src={workshop.img} alt={workshop.workshopname} />
              <div className="dddt">
                <h2 className="header-in-thee-slidee">{workshop.workshopname}</h2>
                <p className="text-in-thee-slidee">Date: {workshop.date}</p>
                <p className="registered-in-green">Registered</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
) : (
  <>
    <h2 className="the-heading-in-conferences">Workshops</h2>
    <p className="text-in-thee-slide"> You most register to a workshop to view it here!</p></>
)}


{scheduleArray.length > 0 ? (
  <>
    <h2 className="the-heading-in-conferences">Schedule Of Your Courses</h2>
    <div className='schedule-in-student-dashboard'>
      <div className="the-div-of-userss-schedule">
        <div className="table-container">
          <table className="the-users-table">
            <thead>
              <tr>
                <th></th>
                {hours.map((hour, index) => (
                  <th key={index}>{hour}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day, dayIndex) => (
                <tr key={dayIndex}>
                  <td>{day}</td>
                  {hours.map((hour, hourIndex) => (
                    <td key={hourIndex}>{scheduleTable[dayIndex][hourIndex]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
) : (
  <>
    <h2 className="the-heading-in-conferences">Courses</h2>
    <p className="text-in-thee-slide">You most register to a course to view the course here!</p></>
)}

{selectedWorkshop && (
        <div className="Confoverlay">
          <div className="Conferencepopup">
            <div className="Conferencepopup-content">
              <span className="close" onClick={handleCloseWorkshopPopup}>
                &times;
              </span>
              <h2>{selectedWorkshop.workshopname}</h2>
              <p>Date: {selectedWorkshop.date}</p>
              <p>Zoom Link: {selectedWorkshop.zoom_link}</p>
          
            </div>
          </div>
        </div>
      )}  
   {isProfilePopupOpen && (
        <div className="Confoverlay">
          <div className="Conferencepopup">
            <div className="Conferencepopup-content">
              <span className="close" onClick={handleCloseProfilePopup}>
                &times;
              </span>
              <h2>Edit Profile</h2>
              <div className='inputs-in-user-info'>
                <label>Email: </label>
                <input
                  type="email"
                  name="email"
                  value={profileFormData.email}
                  onChange={handleProfileInputChange}
                />
              </div>
              <div  className='inputs-in-user-info'>
                <label>Full Name: </label>
                <input
                  type="text"
                  name="fullName"
                  value={profileFormData.fullName}
                  onChange={handleProfileInputChange}
                />
              </div>
              <div  className='inputs-in-user-info'>
                <label>Old Password: </label>
                <input
                  type="password"
                  name="oldPassword"
                  value={profileFormData.oldpassword}
                  onChange={handleProfileInputChange}
                />
              </div>
              <div  className='inputs-in-user-info'>
                <label>New Password: </label>
                <input
                  type="password"
                  name="newPassword"
                  value={profileFormData.newPassword}
                  onChange={handleProfileInputChange}
                />
              </div>
             
              <div className='buttons-in-edit-user'> <button className='saveButton' onClick={handleSaveProfile}>Save</button>
              <img src='./images/doorrrr.svg' onClick={handleLogoutProfile}/></div>
            </div>
          </div>
        </div>
      )}
       {isAddReviewPopupOpen && (
        <div className="Confoverlay">
          <div className="Conferencepopup">
            <div className="Conferencepopup-content">
              <span className="close" onClick={handleCloseAddReviewPopup}>
                &times;
              </span>
              <h2>Add Review</h2>
              <form onSubmit={handleAddReviewSubmit}>
                <div className='inputs-in-user-info'>
                  <label>Description: </label>
                  <textarea
                    name="description"
                    value={reviewFormData.description}
                    onChange={handleReviewInputChange}
                  />
                </div>    
                
                <button type="submit" className='saveButton'>Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}
  </>
 );
};

export default UserDashboard;
