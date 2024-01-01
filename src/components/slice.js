import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './styles/header.css';

const Slice = () => {
 const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024, 
      settings: {
        slidesToShow: 2, 
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1, 
        slidesToScroll: 1,
        initialSlide: 1
      }
    }
  ]
 };

 return (
    <div className='slidee'><Slider {...settings}>
        <div><div className='first-one-in-slide'>
      <div className='left-side-of-first-in-slide'><img src='./images/audio.svg'/></div>
      <div className='right-side-of-first-in-slide'><h1>Audio & Video</h1><p>include audio and video for each course</p></div>
    </div></div>
    <div> <div className='first-one-in-slide'>
      <div className='left-side-of-first-in-slide'><img src='./images/audio.svg'/></div>
      <div className='right-side-of-first-in-slide'><h1>Audio & Video</h1><p>include audio and video for each course</p></div>
    </div></div>
   <div><div className='first-one-in-slide'>
      <div className='left-side-of-first-in-slide'><img src='./images/audio.svg'/></div>
      <div className='right-side-of-first-in-slide'><h1>Audio & Video</h1><p>include audio and video for each course</p></div>
    </div></div>
    
  </Slider></div>
  
 );
}

export default Slice;
