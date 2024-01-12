import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCourses, updateCoursee, AddCourse, deleteCourse } from '../actions/course';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const courses = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const [showAddCoursePopup, setShowAddCoursePopup] = useState(false);
  const [showUpdateCoursePopup, setShowUpdateCoursePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
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
  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch,confirmDelete,handleUpdateCourse]);
  return (
    <>
      <div className='first-div-in-users'>
        <button onClick={() => setShowAddCoursePopup(true)} className="left-side-of-header-button">+ Add Course</button>
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
                   <div className='buttons-in-courses-of-admin'>
                       <button onClick={() => handleEditCourse(course)}><img className='bin-in-tables' src='./images/pen.svg'/></button>
                       <button onClick={() => handleDeleteCourse(course.id)}><img className='bin-in-tables' src='./images/bin.svg'/></button>
                  </div>
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

      {showAddCoursePopup && (
        <div className="Confoverlay">
          <div className="Conferencepopup">
            <div className="Conferencepopup-contenttt">
              <h2>Add Course</h2>
              <label>
                Language Name:
                <input
                  type="text"
                  value={newCourse.languageName}
                  onChange={(e) => setNewCourse({ ...newCourse, languageName: e.target.value })}
                />
              </label>
              <label>
                Level:
                <input
                  type="text"
                  value={newCourse.level}
                  onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                />
              </label>
              <label>
                Zoom Link:
                <input
                  type="text"
                  value={newCourse.zoom_link}
                  onChange={(e) => setNewCourse({ ...newCourse, zoom_link: e.target.value })}
                />
              </label>
              <label>
                Type:
                <input
                  type="text"
                  value={newCourse.type}
                  onChange={(e) => setNewCourse({ ...newCourse, type: e.target.value })}
                />
              </label>
              <label>
                Price:
                <input
                  type="text"
                  value={newCourse.price}
                  onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                />
              </label>
              <label>
                Image:
                <input type="file" onChange={handleImageChange} />
              </label>
              <button onClick={handleAddCourse}>Add Course</button>
              <button onClick={() => setShowAddCoursePopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showUpdateCoursePopup && selectedCourse && (
        <div className="Confoverlay">
          <div className="Conferencepopup">
            <div className="Conferencepopup-contenttt">
              <h2>Update Course</h2>
              <label>
                Language Name:
                <input
                  type="text"
                  value={selectedCourse.languageName}
                  onChange={(e) =>
                    setSelectedCourse({ ...selectedCourse, languageName: e.target.value })
                  }
                />
              </label>
              <label>
                Level:
                <input
                  type="text"
                  value={selectedCourse.level}
                  onChange={(e) =>
                    setSelectedCourse({ ...selectedCourse, level: e.target.value })
                  }
                />
              </label>
              <label>
                Zoom Link:
                <input
                  type="text"
                  value={selectedCourse.zoom_link}
                  onChange={(e) =>
                    setSelectedCourse({ ...selectedCourse, zoom_link: e.target.value })
                  }
                />
              </label>
              <label>
                Type:
                <input
                  type="text"
                  value={selectedCourse.type}
                  onChange={(e) =>
                    setSelectedCourse({ ...selectedCourse, type: e.target.value })
                  }
                />
              </label>
              <label>
                Price:
                <input
                  type="text"
                  value={selectedCourse.price}
                  onChange={(e) =>
                    setSelectedCourse({ ...selectedCourse, price: e.target.value })
                  }
                />
              </label>
              <label>
                Image:
                <input type="file" onChange={handleImageChange} />
              </label>
              <button onClick={handleUpdateCourse}>Update Course</button>
              <button onClick={() => setShowUpdateCoursePopup(false)}>Cancel</button>
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
export default Courses;