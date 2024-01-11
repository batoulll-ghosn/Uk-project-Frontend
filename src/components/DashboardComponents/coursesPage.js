import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCourses, getCourseByLanguageName, getCourseByLevel, getCourseByType } from '../actions/course';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const courses = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  useEffect(() => {
    const filtered = courses.filter((course) =>
      course.languageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.level.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [courses, searchTerm]);

  const groupByType = (courses) =>
    courses.reduce((groups, course) => {
      const type = course.type === 'Translation' ? 'Translation Courses' : 'Language Courses';
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(course);
      return groups;
    }, {});

  const groupedCourses = groupByType(filteredCourses.length > 0 ? filteredCourses : courses);

  return (
    <>
      <div className='first-div-in-users'>
      <button  className="left-side-of-header-button">+ Add Course</button>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="left-side-of-header-search"
        />
      </div>

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
