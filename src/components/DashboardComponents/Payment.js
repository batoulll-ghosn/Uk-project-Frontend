import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllCoursesWh, updateCourseetoPaid, updateCourseetoNotPaid } from '../actions/course';
import { getAllConfsWh,updateConftoNotPaid,updateConftoPaid} from '../actions/conference';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const ConferencesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const conferences = useSelector((state) => state.conferences);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    const allData = [...(conferences || [])];
    if (searchTerm.trim() === '') {
      setFilteredCourses(allData);
    } else {
      const filtered = allData.filter((data) => {
        const lowerEmail = (data.email || '').toLowerCase();
        const lowerLanguageName = (data.languageName || '').toLowerCase();
        const lowerConferenceName = (data.conference_name || '').toLowerCase();
        return (
          lowerEmail.includes(searchTerm.toLowerCase()) ||
          lowerLanguageName.includes(searchTerm.toLowerCase()) ||
          lowerConferenceName.includes(searchTerm.toLowerCase())
        );
      });
      setFilteredCourses(filtered);
    }
  }, [searchTerm, conferences]);

  const handleCheckboxClick = (data) => {
    if (data.paid !== 1) {
      if (data.languageName) {
        dispatch(updateCourseetoPaid(data.email,data.course_id));
        toast.success('Updated Paid for Course Successfully!');
      } else if (data.conference_name) {
        dispatch(updateConftoPaid(data.email,data.confrence_id));
        toast.success('Updated Paid for Conference Successfully!');
      }
    } else {
      if (data.languageName) {
        dispatch(updateCourseetoNotPaid(data.email,data.course_id));
        toast.success('Updated Course to Not Paid Successfully!');
      } else if (data.conference_name) {
        dispatch(updateConftoNotPaid(data.email,data.confrence_id));
        toast.success('Updated Conference to Not Paid Successfully!');
      }
    }
  };


  useEffect(() => {
    dispatch(getAllCoursesWh());
    dispatch(getAllConfsWh());
  }, [handleCheckboxClick]);

  return (
    <>
    <div className='first-div-in-users'>
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="left-side-of-header-search"
    />
  </div>

  <div className="the-div-of-users">
    <table className="the-users-table">
      <thead>
        <tr>
          <th>Email</th>
          <th>Conference</th>
          <th>Conference Date</th>
          <th>Paid</th>
        </tr>
      </thead>
      <tbody>
        {filteredCourses.map((data) => (
          <tr key={data.confrence_id}>
            <td>{data.email}</td>
            <td>{data.conference_name}</td>
            <td>{data.date}</td>
            <td>
              <input
                type="checkbox"
                checked={data.paid === 1}
                readOnly
                onClick={() => handleCheckboxClick(data)}
              />
              {data.paid === 1 ? 'Yes' : 'No'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
    </>
    
  );
};

const CoursesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    const filterData = () => {
      const allData = courses || [];
      if (searchTerm.trim() === '') {
        setFilteredCourses(allData);
      } else {
        const lowerSearchTerm = searchTerm.toLowerCase();
        const filtered = allData.filter((data) => {
          const lowerEmail = (data.email || '').toLowerCase();
          const lowerLanguageName = (data.languageName || '').toLowerCase();
          const lowerLevel = (data.level || '').toLowerCase();
          const lowerConferenceName = (data.conference_name || '').toLowerCase();

          return (
            lowerEmail.includes(lowerSearchTerm) ||
            lowerLanguageName.includes(lowerSearchTerm) ||
            lowerConferenceName.includes(lowerSearchTerm) ||
            lowerLevel.includes(lowerSearchTerm)
          );
        });
        setFilteredCourses(filtered);
      }
    };

    filterData();
  }, [searchTerm, courses]);

  const handleCheckboxClick = (data) => {
    if (data.paid !== 1) {
      if (data.languageName) {
        dispatch(updateCourseetoPaid(data.email,data.course_id));
        toast.success('Updated Paid for Course Successfully!');
      } else if (data.conference_name) {
        dispatch(updateConftoPaid(data.email,data.course_id));
        toast.success('Updated Paid for Conference Successfully!');
      }
    } else {
      if (data.languageName) {
        dispatch(updateCourseetoNotPaid(data.email,data.course_id));
        toast.success('Updated Course to Not Paid Successfully!');
      } else if (data.conference_name) {
        dispatch(updateConftoNotPaid(data.email,data.course_id));
        toast.success('Updated Conference to Not Paid Successfully!');
      }
    }
  };

  useEffect(() => {
    dispatch(getAllCoursesWh());
    dispatch(getAllConfsWh());
  }, [dispatch, handleCheckboxClick]);

  return (
    <>
      <div className="first-div-in-users">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="left-side-of-header-search"
        />
      </div>

      <div className="the-div-of-users">
        <table className="the-users-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Course Name</th>
              <th>Level</th>
              <th>Paid</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((data) => (
              <tr key={data.course_id}>
                <td>{data.email}</td>
                <td>{data.languageName}</td>
                <td>{data.level}</td>
              
                <td>
                  <input
                    type="checkbox"
                    checked={data.paid === 1}
                    onChange={() => handleCheckboxClick(data)}
                  />
                  {data.paid === 1 ? 'Yes' : 'No'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const MainApp = () => {
  
  const [showConferences, setShowConferences] = useState(true);
  const [showCourses, setShowCourses] = useState(false);

  return (
    <div>
      <div className="buttonspaymentOfUpdatePopupp">
        <button  className="left-side-of-header-button" onClick={() => { setShowCourses(false); setShowConferences(true); }}>Conferences</button>
        <button  className="left-side-of-header-button" onClick={() => { setShowConferences(false); setShowCourses(true); }}>Courses</button>
      </div>
      {showConferences && <ConferencesPage />}
      {showCourses && <CoursesPage />}
    </div>
  );
};

export default MainApp;
