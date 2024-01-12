import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllWorkshops } from '../actions/workshop';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {Link} from 'react-router-dom';
const Workshops = () => {
  const workshops = useSelector((state) => state.workshops);
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getAllWorkshops());
  }, []);
 
  const GoToWorkshops = (event) => {
    event.preventDefault();
    navigate('/workshops');
  };
 
  return (
    <> 
    <div className="conferences-container">
    <div className="main-container-conference">
      <div className="conferences-container">
        {workshops.map((workshop, index) => (
          <div key={index} className="conference-card">
            <img className="img-in-thee-slide" src={workshop.img} />
            <div className="dddt">
            <h2 className="header-in-thee-slidee">{workshop.workshopname}</h2>
            <p className="text-in-thee-slidee">Date: {workshop.date}</p>
            </div>
          </div>
        ))}
      </div>
   </div>
   </div></>
   
  );
 };
 
 export default Workshops;
 