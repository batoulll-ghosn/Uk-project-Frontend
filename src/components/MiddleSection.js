import React, { useState, useEffect } from 'react';
import './styles/middleSection.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { engageToConference } from './actions/conference';
import { getAllConferences} from './actions/conference';
import { getAllCourses } from './actions/course';
import {engageToCourse} from './actions/course'
import { getAllWorkshops,engageToWorkshop } from './actions/workshop';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const MiddleSection = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [category, setCategory] = useState('transcourses');
  const categories = ['transcourses', 'lancourses', 'workshops', 'conferences', 'generalcourses'];
  const conferences = useSelector((state) => state.conferences);
  const courses = useSelector((state) => state.courses);
  const workshops = useSelector((state) => state.workshops);
  const languageCourses = courses.filter((course) => course.type === 'Language');
  const translationCourses = courses.filter((course) => course.type === 'Translation');
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedConference, setSelectedConference] = useState(null);
  const parseDate = (input) => {

   };
   const compareDates = (a, b) => parseDate(a.date) - parseDate(b.date);
 conferences.sort(compareDates);

 const now = new Date();
 const upcomingConferences = conferences.filter(conference => parseDate(conference.date) > now);
  useEffect(() => {
    dispatch(getAllConferences());
    dispatch(getAllCourses());
    dispatch(getAllWorkshops());
  }, []);

  const contentData = {
    transcourses: translationCourses.map((course) => ({
      id:course.id,
      name: course.languageName,
      img: course.img,
      type: course.type,
      price: course.price,
      description: course.level,
      abv: course.abv
    })),
    lancourses: languageCourses.map((course) => ({
      id:course.id,
      name: course.languageName,
      img: course.img,
      type: course.type,
      price: course.price,
      description: course.level,
      abv: course.abv
    })),
    conferences: upcomingConferences
      ? upcomingConferences.map((conference) => ({
          id: conference.id,
          name: conference.conference_name,
          img: conference.img,
          type: conference.type,
          price: conference.price,
          description: conference.description,
          abv: conference.abv
        }))
      : [],
    workshops: workshops
      ? workshops.map((workshop) => ({
          id :workshop.id,
          name: workshop.workshopname,
          img: workshop.img,
          type: workshop.type,
          price: workshop.price,
          description: workshop.description,
          abv: workshop.abv
        }))
      : [],
    generalcourses: courses
      ? courses.map((course) => ({
          id:course.id,
          name: course.languageName,
          img: course.img,
          type: course.type,
          price: course.price,
          description: course.level,
          abv: course.abv
        }))
      : [],
  };

  const handleMouseEnter = (event) => {
    if (event.nativeEvent.offsetX < window.innerWidth / 3) {
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else {
      setCurrentIndex((prevIndex) => (prevIndex < 6 ? prevIndex + 1 : 0));
    }
  };

  const handleButtonClick = (newCategory) => {
    setCurrentIndex(0);
    setCategory(newCategory);
  };

  const handleSlideClick = (content) => {
    console.log("Slide clicked");
    setSelectedConference(content);
    
    console.log(`Selected Conference: ${JSON.stringify(content)}`);
    
    let userId = localStorage.getItem('userId');
    if (userId && userId.length >= 1) {
        setShowPopup(true);
        console.log("Setting showPopup to true");
    } else {
        navigate('/Login'); 
    }
 };
 
 const handleRegisterYes = async () => {
  if (selectedConference) {
    const userId = localStorage.getItem('userId');
    const userMail = localStorage.getItem('email');
    const emailData = {
      email: userMail,
      content: `Registration for ${selectedConference.name} - ${selectedConference.description}. Price: ${selectedConference.price}`,
    };
    switch (selectedConference.abv) {
      case "con":
        try {
          dispatch(engageToConference(selectedConference.id, userId));
          toast.success("Successfully registered to the Conference!");
        } catch (error) {
          toast.error("Failed to register to the Conference!");
        }
        break;
      case "co":
        try {
          dispatch(engageToCourse(selectedConference.id, userId));
          toast.success("Successfully registered to the Course!");
        } catch (error) {
          toast.error("Failed to register to the Course!");
        }
        break;
        case "w":
        try {
          dispatch(engageToWorkshop(selectedConference.id, userId));
          toast.success("Successfully registered to the Workshop!");
        } catch (error) {
          toast.error("Failed to register to the Workshop!");
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
  setShowPopup(false);
 };
 
 


const closePopup = () => {
    setShowPopup(false);
  };

  const renderSlides = () => {
    const slides = [];
    const contents = contentData[category];
    for (let i = 0; i < contents.length; i++) {
      slides.push(
        <div
          key={i}
          className={`slide ${i >= currentIndex && i <= currentIndex + 2 ? 'active' : ''}`}
          onClick={() => handleSlideClick(contents[i])}
        >
          <div id="ddd">
            <img className="img-in-thee-slide" src={contents[i].img} alt={contents[i].name} />
            <div className="dddt">
              <h2 className="header-in-thee-slide">{contents[i].name}</h2>
              <p className="text-in-thee-slide">{contents[i].type}</p>
              <p className="textt-in-thee-slide">{contents[i].description}</p>
              <p className="header-in-thee-slide">{contents[i].price}</p>
            </div>
          </div>
        </div>
      );
    }
    return slides;
  };

  return (
    <div className="middle-section">
      <div className="first-div-in-middle-section">
        <h1 className="header-in-middle-section">We provide Courses,<br/> Conferences & Workshops</h1>
        <p className="text-in-the-middle-section">
          Find the best online and On-site Courses, and Conferences.
          <br />
          Find the best online and On-site Courses. Find the best online
          <br />
          and On-site Courses, and Conferences.
        </p>
      </div>
      <div className="buttons-in-middle-section">
        <div className='buttons-in-middle-sectionn'> <button onClick={() => handleButtonClick('transcourses')}>Translation Courses</button>
        <button onClick={() => handleButtonClick('lancourses')}>Language Courses</button>
        <button onClick={() => handleButtonClick('conferences')}>Conferences</button></div>
        <div className='buttons-in-middle-sectionn'>
        <button onClick={() => handleButtonClick('workshops')}>Workshops</button>
        <button onClick={() => handleButtonClick('generalcourses')}>General Courses</button></div>
       
      </div>
      <div id="the-div-in-middle-section">
        <div id="slider" onMouseEnter={handleMouseEnter}>
          {renderSlides()}
        </div>
      </div>
      {showPopup && selectedConference && (
     <div className="Confoverlay">
       <div className="Conferencepopup">
         <div className="Conferencepopup-content">
            <p>{`Do you want to Register?`}</p>
           <h2>{selectedConference.name}</h2>
           <p>{selectedConference.description}</p>
           <p>{selectedConference.price}</p>
           
           <div className='buttonsOfConfPopup'><button className='left-side-of-header-button' onClick={handleRegisterYes}>Yes</button>
           <button className='left-side-of-header-button' onClick={closePopup}>Close</button></div>
           
         </div>
       </div>
     </div>
   )}
    </div>
  );
};

export default MiddleSection;
