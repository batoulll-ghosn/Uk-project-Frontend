import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllCourses } from '../actions/course';
import { Link } from 'react-router-dom';

const Courses = () => {
  const courses = useSelector((state) => state.courses);
  const dispatch = useDispatch();

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
     
      <div className="main-container-conference">
        {Object.entries(groupedCourses).map(([type, courses], index) => (
          <div key={index}>
            <h2 className="the-heading-in-conferences">{type}</h2>
            <div className="conferences-container">
              {courses.map((course, index) => (
                <div key={index} className="conference-card">
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
    </>
  );
};

export default Courses;
