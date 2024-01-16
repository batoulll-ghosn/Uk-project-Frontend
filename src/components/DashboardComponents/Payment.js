import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCoursesWh, updateCourseetoPaid, updateCourseetoNotPaid } from '../actions/course';
import { getAllConfsWh,updateConftoNotPaid,updateConftoPaid} from '../actions/conference';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Payment = () => {
  const courses = useSelector((state) => state.courses);
  const conferences = useSelector((state) => state.conferences);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    const allData = [...(courses || []), ...(conferences || [])];
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
  }, [searchTerm, courses, conferences]);
  

  const handleCheckboxClick = (data) => {
    if (data.paid !== 1) {
      if (data.languageName) {
        dispatch(updateCourseetoPaid(data.email));
        toast.success('Updated Paid for Course Successfully!');
      } else if (data.conference_name) {
        dispatch(updateConftoPaid(data.email));
        toast.success('Updated Paid for Conference Successfully!');
      }
      
    } else {
      if (data.languageName) {
        dispatch(updateCourseetoNotPaid(data.email));
        toast.success('Updated Course to Not Paid Successfully!');
      } else if (data.conference_name) {
        dispatch(updateConftoNotPaid(data.email));
        toast.success('Updated Conference to Not Paid Successfully!');
      }
    }
  };

  useEffect(() => {
    dispatch(getAllCoursesWh());
    dispatch(getAllConfsWh());
  }, [dispatch,handleCheckboxClick]);

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
              <th>Course/Conference/Workshop</th>
              <th>Level / Conference Date</th>
              <th>Paid</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((data) => (
              <tr key={data.course_id}>
                <td>{data.email}</td>
                <td>{data.languageName || data.conference_name}</td>
                <td>{data.level || data.date}</td>
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

export default Payment;
