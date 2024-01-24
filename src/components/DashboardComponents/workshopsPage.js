import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllWorkshops, AddWorkshop,deleteWorkshop,updateWorkshop,engageToWorkshop } from '../actions/workshop';
import { getAllUsersByRole } from '../actions/user';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; 
const Workshops = () => {
  const users = useSelector((state) => state.users);
  const [showAddCoursePopup, setShowAddCoursePopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const workshops = useSelector((state) => state.workshops);
  const [selectedId, setSelectedId] = useState('');
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [showUpdateCoursePopup, setShowUpdateCoursePopup] = useState(false);
  const [showAddTrainerPopup, setShowAddTrainerPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
const [selectedCourseForTrainer, setSelectedCourseForTrainer] = useState('');
  const [newWorkshop, setNewWorkshop] = useState({
    workshopname: '',
    type: '',
    date: '',
    price: '',
    zoom_link: '',
    img: null,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleUpdateWorkshop = () => {
    const { id, ...updatedWorkshop } = selectedWorkshop;
    dispatch(updateWorkshop(id, selectedWorkshop));
    toast.success('Edit was Done Successfully!')
    setShowUpdateCoursePopup(false);
    setSelectedWorkshop(null);
    setSelectedId('');
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewWorkshop({ ...newWorkshop, img: file });
  };
  const handleImageChangee = (e) => {
    const file = e.target.files[0];
    setSelectedWorkshop({ ...selectedWorkshop, img: file });
  };
  const handleDeleteCourse = (id) => {
    setSelectedId(id);
    setShowDeletePopup(true);
  };
  const handleEditCourse = (workshop) => {
    setShowUpdateCoursePopup(true);
   setSelectedWorkshop(workshop);
    setSelectedId(workshop.id);
  };
  const handleAddCourse = () => {
    dispatch(AddWorkshop(newWorkshop));
    setShowAddCoursePopup(false);
    setNewWorkshop({
      workshopname: '',
      type: '',
      date: '',
      price: '',
      zoom_link: '',
      img: null,
    });
    setSearchTerm('');
  };
  const handleAddTrainerCourse = async () => {
    try {
      await dispatch(engageToWorkshop(selectedCourseForTrainer, selectedUser));
      toast.success('Adding a Trainer for the workshop was Succesfull');
      setShowAddTrainerPopup(false);
    } catch (error) {
      toast.error('Failed in adding a trainer for the workshop!');
    } 
      setSelectedUser('');
      setSelectedCourseForTrainer('');
    
  };
  const confirmDelete = () => {
    dispatch(deleteWorkshop(selectedId));
    toast.success("The Deletion was done successfully!")
    setShowDeletePopup(false);
    setSelectedId('');
  };
  const cancelDelete = () => {
    setShowDeletePopup(false);
  };
  useEffect(() => {
    dispatch(getAllWorkshops());
    dispatch(getAllUsersByRole());
  }, [handleAddCourse,confirmDelete]);

  const filteredWorkshops = workshops.filter(
    (workshop) =>
      workshop.workshopname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.date.includes(searchTerm) ||
      workshop.price.includes(searchTerm)
  );

  return (
    <>
      <div className='first-div-in-users'>
        <button onClick={() => setShowAddCoursePopup(true)} className='left-side-of-header-button'>
          + Add Workshop
        </button>
        <button onClick={() => setShowAddTrainerPopup(true)} className="left-side-of-header-button">+ Add Trainer</button>
       
        <input
          type='text'
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='left-side-of-header-search'
        />
      </div>
      <div className='conferences-container'>
        <div className='main-container-conference'>
          <div className='conferences-container'>
            {filteredWorkshops.map((workshop, index) => (
              <div key={index} className='conference-card'>

                   
                <img className='img-in-thee-slide' src={workshop.img} alt={`workshop-${index}`} />
                <div className='buttons-in-courses-of-admin'>
                    <button onClick={() => handleEditCourse(workshop)}><img className='bin-in-tables' src='./images/pen.svg'/></button>
                      
                     <button onClick={() => handleDeleteCourse(workshop.id)}><img className='bin-in-tables' src='./images/bin.svg'/></button>
                  </div>
                <div className='dddt'>
                  <h2 className='header-in-thee-slidee'>{workshop.workshopname}</h2>
                  <p className='text-in-thee-slidee'>Date: {workshop.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showAddCoursePopup && (
        <div className='Confoverlay'>
          <div className='Conferencepopup'>
            <div className='Conferencepopup-contenttt'>
              <h2>Add Workshop</h2>
              
              <div className='row-in-Add-Popuppp'>
                
                <input
                  type='text'
                  value={newWorkshop.workshopname}
                  onChange={(e) => setNewWorkshop({ ...newWorkshop, workshopname: e.target.value })} 
                  placeholder='Workshop Name'
                  className='input-of-popup'
                />
              
              
                
                <input
                  type='text'
                  value={newWorkshop.type}
                  onChange={(e) => setNewWorkshop({ ...newWorkshop, type: e.target.value })}
                  placeholder='Type'
                  className='input-of-popup'
                />
                </div>
                <div className='row-in-Add-Popuppp'>
                
               
                <input
                  type='text'
                  value={newWorkshop.zoom_link}
                  onChange={(e) => setNewWorkshop({ ...newWorkshop, zoom_link: e.target.value })}
                  placeholder='Zoom Link'
                  className='input-of-popup'
                />
              
              
                
                <input
                  type='date'
                  value={newWorkshop.date}
                  onChange={(e) => setNewWorkshop({ ...newWorkshop, date: e.target.value })}
                  className='input-of-popupp'
                />
              
              </div>
              <div className='row-in-add-Popupp'>
                
                
                <input
                  type='text'
                  value={newWorkshop.price}
                  onChange={(e) => setNewWorkshop({ ...newWorkshop, price: e.target.value })}
                  placeholder='Price'
                  className='input-of-popup'
                />
              
              
                
                <input type='file' onChange={handleImageChange} />
              </div>
              <div className="buttonsOfUpdatePopupp">
              <button className="left-side-of-header-button" onClick={handleAddCourse}>Add Workshop</button>
              <button className="left-side-of-header-button" onClick={() => setShowAddCoursePopup(false)}>Cancel</button></div>
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
       {showUpdateCoursePopup && selectedWorkshop && (
        <div className="Confoverlay">
          <div className="Conferencepopup">
            <div className="Conferencepopup-contenttt">
              <h2>Update Workshop</h2>
              <div className='row-in-Add-Popuppp'>
                
                <input
                  type='text'
                  value={selectedWorkshop.workshopname}
                  onChange={(e) => setSelectedWorkshop({ ...selectedWorkshop, workshopname: e.target.value })} 
                  
                  className='input-of-popup'
                />
              
              
                
                <input
                  type='text'
                  value={selectedWorkshop.type}
                  onChange={(e) => setSelectedWorkshop({ ...selectedWorkshop, type: e.target.value })}
                  placeholder='Type'
                  className='input-of-popup'
                />
                </div>
                <div className='row-in-Add-Popuppp'>
                
               
                <input
                  type='text'
                  value={selectedWorkshop.zoom_link}
                  onChange={(e) => setSelectedWorkshop({ ...selectedWorkshop, zoom_link: e.target.value })}
                  placeholder='Zoom Link'
                  className='input-of-popup'
                />
              
              
                
                <input
                  type='date'
                 
                  onChange={(e) => setSelectedWorkshop({ ...selectedWorkshop, date: e.target.value })}
                  className='input-of-popupp'
                />
              
              </div>
              <div className='row-in-add-Popupp'>
                
                
                <input
                  type='text'
                  value={selectedWorkshop.price}
                  onChange={(e) => setSelectedWorkshop({ ...selectedWorkshop, price: e.target.value })}
                  placeholder='Price'
                  className='input-of-popup'
                />
              
              
                
                <input type='file' onChange={handleImageChangee} />
              </div>
                <div className="buttonsOfUpdatePopupp">
              <button onClick={handleUpdateWorkshop} className="left-side-of-header-button">Update Course</button>
              <button onClick={() => setShowUpdateCoursePopup(false)} className="left-side-of-header-button">Cancel</button></div>
            </div>
          </div>
        </div>
      )}
      {showAddTrainerPopup && (
        <div className="Confoverlay">
          <div className="Conferencepopup">
            <div className="Conferencepopup-contenttt">
              <h2>Add Trainer Workshop</h2>
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
                  <option value="">Select Workshop</option>
                  {workshops.map((workshop) => (
                    <option key={workshop.id} value={workshop.id}>
                      {workshop.workshopname}
                    </option>
                  ))}
                </select>
              </div>
              <div className="buttonsOfUpdatePopupp">
                <button
                  className="left-side-of-header-button"
                  onClick={handleAddTrainerCourse}
                >
                  Add Workshop Trainer
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

export default Workshops;
