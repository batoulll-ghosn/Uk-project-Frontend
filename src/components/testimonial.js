import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles/testimonial.css';
import { getAllReviews } from './actions/review';

const TestimonialItem = ({ review }) => {
  return (
    <div>
      <p className='testimoniage'>{review.description}</p>
      <div className='testi-line-and-name'>
        <hr className='testi-line' />
        <p className='name-testi'>{review.nameOftestemoniated}</p>
      </div>
    </div>
  );
};

const TestimonialComponent = () => {
  const [activePosition, setActivePosition] = useState(0);
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.slice(0, 4));
  console.log(reviews);

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  return (
    <div className='main-in-testimlonial'>
      <div className='left-in-testimlonial'>
        <h1 className='header-in-testimonial'>People Say About Us</h1>
        <div className='container'>
          {reviews?.map((review, position) => (
            <div
              key={review.id}
              className={position === activePosition ? 'element active' : 'element'}
            >
              <TestimonialItem review={review} />
            </div>
          ))}

          <div className='dots-container'>
            <div className='dots'>
              {reviews?.map((review, position) => (
                <span
                  key={review.id}
                  className={position === activePosition ? 'dot active' : 'dot'}
                  onClick={() => setActivePosition(position)}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='right-in-testimlonial'>
        <img src='./images/man.png' alt='Man' />
      </div>
    </div>
  );
};

export default TestimonialComponent;
