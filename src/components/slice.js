import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './styles/header.css';
import { Link } from 'react-router-dom';
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
        dots: false
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
        <div><a href='#services'><div className='first-one-in-slide'>
      <div className='left-side-of-first-in-slide'><img src='./images/person2.svg'/></div>
      <div className='right-side-of-first-in-slide'><h1>500 Trainers</h1><p></p></div>
    </div></a></div>
    <div><a href='#testimonial'><div className='first-one-in-slide'>
      <div className='left-side-of-first-in-slidee'><img src='./images/testimonial.svg'/></div>
      <div className='right-side-of-first-in-slide'><h1>3K Reviews </h1><p></p></div>
    </div></a></div>
 <div>
  <a href="#middle-section">
    <div className='first-one-in-slide'>
      <div className='left-side-of-first-in-slideee'><img src='./images/videos.svg'/></div>
      <div className='right-side-of-first-in-slide'><h1>Recorded Videos</h1></div>
    </div>
  </a>
</div>

    
  </Slider></div>
  
 );
}

export default Slice;
