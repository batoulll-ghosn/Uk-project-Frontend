import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSchedule, AddSchedule,deleteSchedule } from '../actions/schedule';
import { getAllCourses } from '../actions/course';
import { toast } from 'react-toastify'; 
const Schedule = () => {
  const dispatch = useDispatch();
  const schedule = useSelector((state) => state.schedules);
  const courses = useSelector((state) => state.courses); 
  const scheduleArray = Array.isArray(schedule) ? schedule : [];
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [showAddSchedulePopup, setShowAddSchedulePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState('');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const hours = [
    '9:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
  ];

  const confirmDelete = () => {
    dispatch(deleteSchedule(selectedId));
    setShowDeletePopup(false);
    setSelectedId('');
    toast.success('The session has been deleted successfully!')
  };

  const handleAddSchedule = () => {
    const course_id = selectedCourse;

    try {
            if (course_id) {
                 dispatch(AddSchedule(course_id, selectedDay, selectedHour));
                 toast.success('Session Added Successfully!');
                setShowAddSchedulePopup(false);
            } else {
                console.error('Selected course not found.');
            }
        } catch (error) {
            console.error('Failed to add schedule:', error);
             toast.error('This Session is served , Add another session Please!');
        }

    setShowAddSchedulePopup(false);
  };
  const handleCancelAddSchedule = () => {
    setShowAddSchedulePopup(false);
  };
  const filteredScheduleArray = schedule.filter((event) =>
    event.languageName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scheduleTable = Array.from({ length: days.length }, () =>
    Array.from({ length: hours.length }, () => [])
  );

  filteredScheduleArray.forEach((event) => {
    const eventDayIndex = days.indexOf(event.day);
    const eventHourIndex = hours.indexOf(event.hour);

    if (eventDayIndex >= 0 && eventHourIndex >= 0) {
      scheduleTable[eventDayIndex][eventHourIndex].push(
        <div key={event.id}>
             <button onClick={() => handleDeleteSchedule(event.id)}><img className='bin-in-tables' src='./images/bin.svg'/></button>
          <p>
            {event.languageName} {event.level}
          </p>
          <a
            href={event.zoom_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Zoom Meeting Link
          </a>
        </div>
      );
    }
  });
  const handleDeleteSchedule = (id) => {
    setSelectedId(id);
    setShowDeletePopup(true);
  };
  const cancelDelete = () => {
    setShowDeletePopup(false);
  };
  useEffect(() => {
    dispatch(getSchedule());
    dispatch(getAllCourses()); 
  }, [handleAddSchedule,confirmDelete,getAllCourses]);
  return (
    <>
      <div className="first-div-in-users">
        <button
          onClick={() => setShowAddSchedulePopup(true)}
          className="left-side-of-header-button"
        >
          + Add Session
        </button>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="left-side-of-header-search"
        />
      </div>
      {scheduleArray.length > 0 && (
        <>
          <div className="the-div-of-userss">
            <table className="the-users-table">
              <thead>
                <tr>
                  <th></th>
                  {hours.map((hour, index) => (
                    <th key={index}>{hour}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day, dayIndex) => (
                  <tr key={dayIndex}>
                    <td>{day}</td>
                    {hours.map((hour, hourIndex) => (
                      <td key={hourIndex}>
                        {scheduleTable[dayIndex][hourIndex]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
       {showAddSchedulePopup && (
        <div className="Confoverlay">
          <div className="Conferencepopup">
            <div className="Conferencepopup-contenttt">
              <label>
                Course:
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  {courses.map((course) => (
                    <option
                      key={course.id}
                      value={course.id}
                    >
                      {course.languageName} {course.level}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Day:
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                >
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Hour:
                <select
                  value={selectedHour}
                  onChange={(e) => setSelectedHour(e.target.value)}
                >
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </label>
              <button onClick={handleAddSchedule}>Add Schedule</button>
              <btton onClick={handleCancelAddSchedule} >Cancel</btton>
            </div>
          </div>
        </div>
      )}
     {showDeletePopup && (
        <div className="Confoverlay">
          <div className="Conferencepopup">
            <div className="Conferencepopup-content">
              <p>Are you sure you want to delete?</p>
              <div className="buttonsOfConfPopup">
                <button className="left-side-of-header-button" onClick={confirmDelete}>
                  Yes
                </button>
                <button className="left-side-of-header-button" onClick={cancelDelete}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Schedule;
