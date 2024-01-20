import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllCourses,engageToCourse } from './actions/course';
import { Link } from 'react-router-dom';
import './styles/scroll.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {getUserID} from '../Data/getData';
const Courses = () => {
  const courses = useSelector((state) => state.courses);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedConference, setSelectedConference] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const handleSlideClick = (content) => {
    console.log("Slide clicked");
    setSelectedConference(content);
    const userId = getUserID();
    console.log(userId);
    setShowPopup(true);
 };
 const closePopup = () => {
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
          navigate(`/conference/${selectedConference.id}`)
        break;
      default:
        break;
    }
    
  }
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
      case "co":
        try {
          const userId = getUserID();
          dispatch(engageToCourse(selectedConference.id, userId));
          toast.success("Successfully registered to the Course!");
          setShowPopup(false);
        } catch (error) {
          toast.error("Failed to register to the Course!");
          setShowPopup(false);
        }
        break;
        
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
  useEffect(() => {
    dispatch(getAllCourses());
  }, []);

  const groupByType = (courses) =>
    courses.reduce((groups, course) => {
      const type = course.type === 'Translation' ? 'Translation Courses' : 'Language Courses';
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(course);
      return groups;
    }, {});

  const groupedCourses = groupByType(courses);

  return (
    <>
      <div className="the-header-in-conferences">
        <div className="div-of-logo-in-footer">
          <Link to="/">
            <img src="./images/logo.jpeg" alt="Logo" />
          </Link>
        </div>
        <div>
          <h2 className="the-Our-Conferences">Our Courses</h2>
        </div>
      </div>
      <div className="main-container-conference">
        {Object.entries(groupedCourses).map(([type, courses], index) => (
          <div key={index}>
            <h2 className="the-heading-in-conferences">{type}</h2>
            <div className="conferences-container">
              {courses.map((course, index) => (
                <div key={index} className="conference-card"  onClick={() => handleSlideClick(course)}>
                  <img className="img-in-thee-slide" src={course.img} alt={course.course_name} />
                  <div className="dddt">
                    <h2 className="header-in-thee-slide">{course.type} Course</h2>
                    <p className="text-in-thee-slide">{course.languageName}</p>
                    <p className="text-in-thee-slide">{course.level}</p>
                    <p className="textt-in-thee-slide">
                      Find the best online and On-site Courses & Conferences. Find the best online.
                    </p>
                    <p className="header-in-thee-slide">{course.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {showPopup && selectedConference && (
     <div className="Confoverlay">
       <div className="Conferencepopup">
         <div className="Conferencepopup-content">
         <div className="titleandclose">   <p>{`Do you want to Register?`}</p> <button  onClick={closePopup}>&#10005;</button></div>
           <h2>{selectedConference.name}</h2>
           <p>{selectedConference.description}</p>
           <p>{selectedConference.price}</p>
           
           <div className='buttonsOfConfPopup'><button className='left-side-of-header-button' onClick={handleRegisterYes}>Yes</button>
           <button className='left-side-of-header-button' onClick={handleViewDetails} >View More Details</button></div>
           
         </div>
       </div>
     </div>
   )}
    </>
  );
};

export default Courses;
