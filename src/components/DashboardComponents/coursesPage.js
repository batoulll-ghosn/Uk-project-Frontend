import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCourses, updateCoursee, AddCourse, deleteCourse ,engageTeacherCourse} from '../actions/course';
import { getAllUsersByRole } from '../actions/user';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const courses = useSelector((state) => state.courses);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [showAddCoursePopup, setShowAddCoursePopup] = useState(false);
  const [showUpdateCoursePopup, setShowUpdateCoursePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showAddTrainerPopup, setShowAddTrainerPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
const [selectedCourseForTrainer, setSelectedCourseForTrainer] = useState('');

  const [selectedId, setSelectedId] = useState('');
  const [newCourse, setNewCourse] = useState({
    languageName: '',
    level: '',
    zoom_link: '',
    type: '',
    price: '',
    img: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewCourse({ ...newCourse, img: file });
  };
  const handleImageChangee = (e) => {
    const file = e.target.files[0];
    setSelectedCourse({ ...selectedCourse, img: file });
  };
  useEffect(() => {
    const filtered = courses.filter((course) =>
      course.languageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.price.includes(searchTerm)
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

  const handleAddCourse = () => {
    dispatch(AddCourse(newCourse));
    setShowAddCoursePopup(false);
    setNewCourse({
      languageName: '',
      level: '',
      zoom_link: '',
      type: '',
      price: '',
      img: null,
    });
    setSearchTerm('');
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setShowUpdateCoursePopup(true);
    setSelectedId(course.id);
  };
 
  const handleUpdateCourse = () => {
    const Id = selectedId;
    const { languageName, level, zoom_link, type, price, img } = selectedCourse;

    dispatch(updateCoursee(Id, languageName, level, zoom_link, type, price, img));
    setShowUpdateCoursePopup(false);
    setSelectedCourse(null);
    setSelectedId('');
  };

  const handleDeleteCourse = (id) => {
    setSelectedId(id);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    dispatch(deleteCourse(selectedId));
    setShowDeletePopup(false);
    setSelectedId('');
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
  };
  const handleAddTrainerCourse = async () => {
    try {
      await dispatch(engageTeacherCourse(selectedCourseForTrainer, selectedUser));
      toast.success('Adding a Trainer for the course was Succesfull');
      setShowAddTrainerPopup(false);
    } catch (error) {
      toast.error('Failed to engage trainer to course. Please try again.');
    } 
      setSelectedUser('');
      setSelectedCourseForTrainer('');
    
  };
  
  useEffect(() => {
    dispatch(getAllCourses());
    dispatch(getAllUsersByRole());
  }, [dispatch,confirmDelete,handleUpdateCourse]);
  return (
    <>
      <div className='first-div-in-users'>
        <button onClick={() => setShowAddCoursePopup(true)} className="left-side-of-header-button">+ Add Course</button>
        <button onClick={() => setShowAddTrainerPopup(true)} className="left-side-of-header-button">+ Add Trainer Course</button>
       
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
                  <div className='buttons-in-courses-of-admin'>
                       <button onClick={() => handleEditCourse(course)}><img className='bin-in-tables' src='./images/pen.svg'/></button>
                       <button onClick={() => handleDeleteCourse(course.id)}><img className='bin-in-tables' src='./images/bin.svg'/></button>
                  </div>
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

      {showAddCoursePopup && (
        <div className="Confoverlay">
          <div className="Conferencepopup">
            <div className="Conferencepopup-contenttt">
              <h2>Add Course</h2>
              <div className='row-in-Add-Popuppp'>
                
                <input
                  type="text"
                  value={newCourse.languageName}
                  onChange={(e) => setNewCourse({ ...newCourse, languageName: e.target.value })}
                  className='input-of-popup'
                  placeholder='Language Name'
                />
                <input  className='input-of-popup'
                  type="text"
                  value={newCourse.level}
                  onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                  placeholder='Level'
                />
              </div>
              <div className='row-in-Add-Popuppp'>
                <input
                  type="text"  className='input-of-popup'
                  value={newCourse.zoom_link}
                  onChange={(e) => setNewCourse({ ...newCourse, zoom_link: e.target.value })}
                  placeholder='Zoom Link'
                />
                <input
                  type="text"  className='input-of-popup'
                  value={newCourse.type}
                  onChange={(e) => setNewCourse({ ...newCourse, type: e.target.value })}
                  placeholder='Type'
                />
              </div>
              <div className='row-in-add-Popupp'>
                <input
                  type="text"  className='input-of-popup'
                  value={newCourse.price}
                  onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                  placeholder='Price'
                />
                <input type="file" onChange={handleImageChange}  className='input-of-popup' />
              </div>
              <div className="buttonsOfUpdatePopupp">
              <button className="left-side-of-header-button" onClick={handleAddCourse}>Add Course</button>
              <button className="left-side-of-header-button" onClick={() => setShowAddCoursePopup(false)}>Cancel</button></div>
            </div>
          </div>
        </div>
      )}

      {showUpdateCoursePopup && selectedCourse && (
        <div className="Confoverlay">
          <div className="Conferencepopup">
            <div className="Conferencepopup-contenttt">
              <h2>Update Course</h2>
              <div className='row-in-Add-Popup'> <input
                  type="text"
                  value={selectedCourse.languageName}
                  onChange={(e) =>
                    setSelectedCourse({ ...selectedCourse, languageName: e.target.value })
                  }
                  className='input-of-popup'
                  placeholder='Language Name'
                />
                <input
                  type="text"
                  value={selectedCourse.level}
                  onChange={(e) =>
                    setSelectedCourse({ ...selectedCourse, level: e.target.value })
                  }
                  className='input-of-popup'
                  placeholder='Level'
                /></div>
               
               <div className='row-in-Add-Popup'>
                <input
                  type="text"
                  value={selectedCourse.zoom_link}
                  onChange={(e) =>
                    setSelectedCourse({ ...selectedCourse, zoom_link: e.target.value })
                  }
                  className='input-of-popup'
                  placeholder='Zoom Link'
                />
              
                <input
                 className='input-of-popup'
                  type="text"
                  value={selectedCourse.type}
                  onChange={(e) =>
                    setSelectedCourse({ ...selectedCourse, type: e.target.value })
                  }
                  placeholder='Type'
                />
               </div>
               <div className='roww-in-Add-Popupp'><input  className='input-of-popup'
                  type="text"
                  value={selectedCourse.price}
                  onChange={(e) =>
                    setSelectedCourse({ ...selectedCourse, price: e.target.value })
                  }
                />
              
                
                <input type="file" onChange={handleImageChangee}  className='input-of-popup'/></div>
                
                <div className="buttonsOfUpdatePopupp">
              <button onClick={handleUpdateCourse} className="left-side-of-header-button">Update Course</button>
              <button onClick={() => setShowUpdateCoursePopup(false)} className="left-side-of-header-button">Cancel</button></div>
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
       {showAddTrainerPopup && (
        <div className="Confoverlay">
          <div className="Conferencepopup">
            <div className="Conferencepopup-contenttt">
              <h2>Add Trainer Course</h2>
              <div className="row-in-Add-Popuppp">
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="input-of-popup"
                >
                  <option value="">Select Trainer</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.email}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedCourseForTrainer}
                  onChange={(e) => setSelectedCourseForTrainer(e.target.value)}
                  className="input-of-popup"
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.languageName}{course.level}
                    </option>
                  ))}
                </select>
              </div>
              <div className="buttonsOfUpdatePopupp">
                <button
                  className="left-side-of-header-button"
                  onClick={handleAddTrainerCourse}
                >
                  Add Trainer Course
                </button>
                <button
                  className="left-side-of-header-button"
                  onClick={() => setShowAddTrainerPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};
export default Courses;