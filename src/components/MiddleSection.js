import React, { useState, useEffect } from 'react';
import './styles/middleSection.css'; 
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllConferences } from './actions/conference';
import { getAllCourses } from './actions/course';


   
const MiddleSection = () => {
 const [currentIndex, setCurrentIndex] = useState(0);
 const [category, setCategory] = useState('courses');
 const categories = ['courses', 'books', 'music', 'confreces','generalcourses'];
 const conferences = useSelector((state) => state.conferences);
 const courses =useSelector((state)=>state.courses);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllConferences());
    dispatch(getAllCourses());
    }, []);
  const contentData = {
    'courses': courses? courses.map(course =>({ name: course.languageName, img: course.img, type: course.type, price:course.price, description:course.level})):[],
    'books': ['Book 1', 'Book 2', 'Book 3', 'Book 4', 'Book 5', 'Book 6'],
    'confreces': conferences ? conferences.map(conference => ({ name: conference.conference_name, img: conference.img, type: conference.type, price:conference.price, description:conference.description })) : [],

    'movies': ['Movie 1', 'Movie 2', 'Movie 3', 'Movie 4', 'Movie 5', 'Movie 6'],
    'generalcourses':['Course 1', 'Book 2', 'Track 3', 'Movie 4', 'Course 5', 'Course 6']
   };
 const handleMouseEnter = (event) => {
     if (event.nativeEvent.offsetX < window.innerWidth / 3) {
         setCurrentIndex((prevIndex) => prevIndex > 0 ? prevIndex - 1 : 0);
     } else {
         setCurrentIndex((prevIndex) => prevIndex < 6 ? prevIndex + 1 : 0);
     }
 };

 const handleButtonClick = (newCategory) => {
     setCurrentIndex(0);
     setCategory(newCategory);
 };

 const renderSlides = () => {
    const slides = [];
    const contents = contentData[category];
    for (let i = 0; i < contents.length; i++) {
        slides.push(
            <div 
            
              key={i} 
              className={`slide ${i >= currentIndex && i <= currentIndex + 2 ? 'active' : ''}`}
            > 
            <div id='ddd'> <img className='img-in-thee-slide' src={contents[i].img} alt={contents[i].name} />
            <div className='dddt'><h2 className='header-in-thee-slide'>{contents[i].name}</h2>
            <p className='text-in-thee-slide'>{contents[i].type}</p>
            <p className='textt-in-thee-slide'>{contents[i].description}</p>
            <p className='header-in-thee-slide'>{contents[i].price}</p></div>
            
            </div>
            
             
            </div>
        );
    }
    return slides;
  };
  

 return (
     <div className='middle-section'>
     <div className='first-div-in-middle-section'>
        <h1 className='header-in-middle-section'>We provide Courses,<br/> Conferences & Workshops</h1>
        <p className='text-in-the-middle-section'>Find the best online and On-site Courses,and Conferences.<br/>    Find the best online and On-site Courses.Find the best online<br/> and On-site Courses,and Conferences.</p>
     </div>
      <div className='buttons-in-middle-section'> 
         <button onClick={() => handleButtonClick('courses')}>Translation Courses</button>
         <button onClick={() => handleButtonClick('books')}>Language Courses</button>
         <button onClick={() => handleButtonClick('confreces')}>Confrences</button>
         <button onClick={() => handleButtonClick('movies')}>Workshops</button>
         <button onClick={() => handleButtonClick('generalcourses')}>General Courses</button>
    </div>
         <div id='the-div-in-middle-section'>
         <div id="slider" onMouseEnter={handleMouseEnter}>
             {renderSlides()}
         </div></div>
     </div>
 );
};

export default MiddleSection;
