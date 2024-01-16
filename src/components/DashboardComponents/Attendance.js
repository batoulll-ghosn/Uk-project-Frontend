import React, { useState } from 'react';

const Attendance = () => {
  // State to manage attendance data
  const [attendanceList, setAttendanceList] = useState([]);
  const [newEntry, setNewEntry] = useState('');

  // Function to handle adding a new attendance entry
  const addAttendanceEntry = () => {
    if (newEntry.trim() !== '') {
      setAttendanceList((prevList) => [...prevList, newEntry]);
      setNewEntry('');
    }
  };

  return (
    <div>
      <h2>Attendance</h2>
      <ul>
        {attendanceList.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Enter attendance record"
        />
        <button onClick={addAttendanceEntry}>Add</button>
      </div>
    </div>
  );
};

export default Attendance;
