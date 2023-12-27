import React, { useState, useEffect } from 'react';


const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length);
  };

  const showNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  useEffect(() => {
    const intervalId = setInterval(showNext, 3000); // Change the duration (in milliseconds) as needed

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const carouselItems = [
    { id: 1, src: 'image1.jpg', alt: 'Image 1', title: 'Title 1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 2, src: 'image2.jpg', alt: 'Image 2', title: 'Title 2', text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { id: 3, src: 'image3.jpg', alt: 'Image 3', title: 'Title 3', text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' },
    // Add more items as needed
  ];

  return (
    <div className="carousel">
      <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
       
          <div className="carousel-item" >
          <div className='first-one-in-slide'>
            <div className='left-side-of-first-in-slide'><img src='./images/audio.svg'/></div>
            <div className='right-side-of-first-in-slide'><h1>Audio & Video</h1><p>include audio and video for each course</p></div>
           </div>
          </div>
          <div className="carousel-item" >
          <div className='first-one-in-slide'>
            <div className='left-side-of-first-in-slide'><img src='./images/audio.svg'/></div>
            <div className='right-side-of-first-in-slide'><h1>Audio & Video</h1><p>include audio and video for each course</p></div>
         </div>
        </div>
          <div className="carousel-item" >
          <div className='first-one-in-slide'>
            <div className='left-side-of-first-in-slide'><img src='./images/audio.svg'/></div>
            <div className='right-side-of-first-in-slide'><h1>Audio & Video</h1><p>include audio and video for each course</p></div>
        </div>
        </div>
      {/* Optional: Add styling for navigation buttons */}
     
    </div>
    <button className="carousel-prev" onClick={showPrev}>Prev</button>
    <button className="carousel-next" onClick={showNext}>Next</button>
    </div>
  );
};

export default Carousel;
