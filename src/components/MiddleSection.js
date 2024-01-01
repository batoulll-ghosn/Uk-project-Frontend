import React, { useState } from 'react';
import './styles/middleSection.css'; // Import the CSS file

const contentData = {
 'courses': ['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5', 'Course 6'],
 'books': ['Book 1', 'Book 2', 'Book 3', 'Book 4', 'Book 5', 'Book 6'],
 'music': ['Track 1', 'Track 2', 'Track 3', 'Track 4', 'Track 5', 'Track 6'],
 'movies': ['Movie 1', 'Movie 2', 'Movie 3', 'Movie 4', 'Movie 5', 'Movie 6'],
 'generalcourses':['Course 1', 'Book 2', 'Track 3', 'Movie 4', 'Course 5', 'Course 6']
};

const MiddleSection = () => {
 const [currentIndex, setCurrentIndex] = useState(0);
 const [category, setCategory] = useState('courses');
 const categories = ['courses', 'books', 'music', 'movies','generalcourses'];

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
     for (let i = 0; i < 6; i++) {
         slides.push(
             <div 
               key={i} 
               className={`slide ${i >= currentIndex && i <= currentIndex + 2 ? 'active' : ''}`}
               
             >
               {contents[i]}
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
         <button onClick={() => handleButtonClick('music')}>Confrences</button>
         <button onClick={() => handleButtonClick('movies')}>Workshops</button>
         <button onClick={() => handleButtonClick('generalcourses')}>General Courses</button>
    </div>
         
         <div id="slider" onMouseEnter={handleMouseEnter}>
             {renderSlides()}
         </div>
     </div>
 );
};

export default MiddleSection;
