
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllConferences, engageToConference, AddConf,deleteCon, updateConf } from '../actions/conference';
import { toast } from 'react-toastify';

const Conferences = () => {
  const conferences = useSelector((state) => state.conferences);
  const dispatch = useDispatch();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const parseDate = (input) => {
    const [day, month, year] = input.split('/');
    return new Date(`${month}/${day}/${year}`);
  };

  const compareDates = (a, b) => parseDate(a.date) - parseDate(b.date);
  conferences.sort(compareDates);

  const now = new Date();
  const pastConferences = conferences.filter((conference) => parseDate(conference.date) <= now);
  const upcomingConferences = conferences.filter((conference) => parseDate(conference.date) > now);

  const [showAddConfPopup, setShowAddConfPopup] = useState(false);
  const [newConference, setNewConference] = useState({
    conference_name: '',
    type: '',
    date: '',
    price: '',
    description: '',
    zoom_link: '',
    resources: '',
    img: null,
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewConference({ ...newConference, img: file });
  };
  const confirmDelete = () => {
    dispatch(deleteCon(selectedId));
    setShowDeletePopup(false);
    setSelectedId('');
  };
  const cancelDelete = () => {
    setShowDeletePopup(false);
  };
  const handleAddConference = () => {
    dispatch(AddConf(newConference));
    setShowAddConfPopup(false);
  };
  const handleUpdateConference = () => {
    dispatch(updateConf(selectedId, newConference.conference_name, newConference.type, newConference.date, newConference.price, newConference.description, newConference.zoom_link, newConference.resources, newConference.img));
    setShowUpdatePopup(false);
    setSelectedId('');
    setNewConference({
      conference_name: '',
      type: '',
      date: '',
      price: '',
      description: '',
      resources: '',
      img: null,
    });
   };
   
  const openPopup = (conference) => {
    setShowAddConfPopup(true);
  };
  const handleUpdate = (id) => {
    
    setShowUpdatePopup(true);
    const selectedConference = conferences.find((conference) => conference.id === id);

    setSelectedId(id);
    setNewConference({
      conference_name: selectedConference.conference_name,
      type: selectedConference.type,
      date: selectedConference.date,
      price: selectedConference.price,
      description: selectedConference.description,
      zoom_link: selectedConference.zoom_link,
      resources: selectedConference.resources,
      img: selectedConference.img,
    });
    
  };
  const handleDeleteCourse = (id) => {
    setSelectedId(id);
    setShowDeletePopup(true);
  };
  const closePopup = () => {
    setShowAddConfPopup(false);
    setNewConference({
      conference_name: '',
      type: '',
      date: '',
      price: '',
      description: '',
      resources: '',
      img: null,
    });
  };
  const closePopupOfEdit = () => {
    setShowUpdatePopup(false);
    setNewConference({
      conference_name: '',
      type: '',
      date: '',
      price: '',
      description: '',
      resources: '',
      img: null,
    });
  };
  useEffect(() => {
    dispatch(getAllConferences());
  }, [dispatch,handleAddConference,confirmDelete,handleUpdateConference]);
  return (
    <>
      <div className='first-div-in-users'>
        <button onClick={() => setShowAddConfPopup(true)} className="left-side-of-header-button"> + Add Conference</button>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="left-side-of-header-search"
        />
      </div>

      <div className="main-container-conference">
        <div>
          
          <div className="conferences-container">
            {upcomingConferences
              .filter((conference) => {
                const lowerCaseSearchTerm = searchTerm.toLowerCase();
                return (
                  conference.conference_name.toLowerCase().includes(lowerCaseSearchTerm) ||
                  conference.type.toLowerCase().includes(lowerCaseSearchTerm) ||
                  conference.date.includes(searchTerm) ||
                  conference.description.toLowerCase().includes(lowerCaseSearchTerm) ||
                  conference.price.includes(searchTerm)
                );
              })
              .map((conference, index) => (
                <div key={index} className="conference-card">
                  <div className='buttons-in-courses-of-admin'>
                       <button ><img className='bin-in-tables' src='./images/pen.svg' onClick={() => handleUpdate(conference.id)}/></button>
                       <button onClick={() => handleDeleteCourse(conference.id)}><img className='bin-in-tables' src='./images/bin.svg'/></button>
                  </div>
                  <img className="img-in-thee-slide" src={conference.img} alt={conference.conference_name} />
                  <div className="dddt">
                    <h2 className="header-in-thee-slide">{conference.conference_name}</h2>
                    <p className="text-in-thee-slide">{conference.type}</p>
                    <p className="textt-in-thee-slide">{conference.description}</p>
                    <p className="textt-in-thee-slide">Date: {conference.date}</p>
                    <p className="header-in-thee-slide">{conference.price}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div>
          
          <div className="conferences-container">
            {pastConferences
              .filter((conference) => {
                const lowerCaseSearchTerm = searchTerm.toLowerCase();
                return (
                  conference.conference_name.toLowerCase().includes(lowerCaseSearchTerm) ||
                  conference.type.toLowerCase().includes(lowerCaseSearchTerm) ||
                  conference.date.includes(searchTerm) ||
                  conference.description.toLowerCase().includes(lowerCaseSearchTerm)
                );
              })
              .map((conference, index) => (
                <div key={index} className="conference-card" onClick={() => openPopup(conference)}>
                  <div className='buttons-in-courses-of-admin'>
                       <button ><img className='bin-in-tables' src='./images/pen.svg' onClick={() => handleUpdate(conference.id)}/></button>
                       <button onClick={() => handleDeleteCourse(conference.id)}><img className='bin-in-tables' src='./images/bin.svg'/></button>
                  </div>
                  <img className="img-in-thee-slide" src={conference.img} alt={conference.conference_name} />
                  <div className="dddt">
                    <h2 className="header-in-thee-slide">{conference.conference_name}</h2>
                    <p className="text-in-thee-slide">{conference.type}</p>
                    <p className="textt-in-thee-slide">{conference.description}</p>
                    <p className="textt-in-thee-slide">Date: {conference.date}</p>
                    <p className="header-in-thee-slide">{conference.price}</p>
                    
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {showAddConfPopup && (
        <div className="Confoverlay">
          <div className="Conferencepopup">
            <div className="Conferencepopup-contenttt">
              <h2>Add Conference</h2>
              <label>
                Conference Name:
                <input
                  type="text"
                  value={newConference.conference_name}
                  onChange={(e) => setNewConference({ ...newConference, conference_name: e.target.value })}
                />
              </label>
              <label>
                Type:
                <input
                  type="text"
                  value={newConference.type}
                  onChange={(e) => setNewConference({ ...newConference, type: e.target.value })}
                />
              </label>
              <label>
                Date:
                <input
                  type="text"
                  value={newConference.date}
                  onChange={(e) => setNewConference({ ...newConference, date: e.target.value })}
                />
              </label>
              <label>
                Price:
                <input
                  type="text"
                  value={newConference.price}
                  onChange={(e) => setNewConference({ ...newConference, price: e.target.value })}
                />
              </label>
              <label>
                Description:
                <input
                  type="text"
                  value={newConference.description}
                  onChange={(e) => setNewConference({ ...newConference, description: e.target.value })}
                />
              </label>
              <label>
                Zoom Link:
                <input
                  type="text"
                  value={newConference.zoom_link}
                  onChange={(e) => setNewConference({ ...newConference, zoom_link: e.target.value })}
                />
              </label>
              <label>
                Resources:
                <input
                  type="text"
                  value={newConference.resources}
                  onChange={(e) => setNewConference({ ...newConference, resources: e.target.value })}
                />
              </label>
              <label>
                Image:
                <input type="file" name="img" onChange={handleImageChange} />
              </label>
              <button onClick={handleAddConference}>Add Conference</button>
              <button onClick={closePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
       {showUpdatePopup && (
        <div className="Confoverlay">
          <div className="Conferencepopup">
            <div className="Conferencepopup-contenttt">
              <h2>Update Conference</h2>
              <label>
                Conference Name:
                <input
                  type="text"
                  value={newConference.conference_name}
                  onChange={(e) => setNewConference({ ...newConference, conference_name: e.target.value })}
                />
              </label>
              <label>
                Type:
                <input
                  type="text"
                  value={newConference.type}
                  onChange={(e) => setNewConference({ ...newConference, type: e.target.value })}
                />
              </label>
              <label>
                Date:
                <input
                  type="text"
                  value={newConference.date}
                  onChange={(e) => setNewConference({ ...newConference, date: e.target.value })}
                />
              </label>
              <label>
                Price:
                <input
                  type="text"
                  value={newConference.price}
                  onChange={(e) => setNewConference({ ...newConference, price: e.target.value })}
                />
              </label>
              <label>
                Description:
                <input
                  type="text"
                  value={newConference.description}
                  onChange={(e) => setNewConference({ ...newConference, description: e.target.value })}
                />
              </label>
              <label>
                Zoom Link:
                <input
                  type="text"
                  value={newConference.zoom_link}
                  onChange={(e) => setNewConference({ ...newConference, zoom_link: e.target.value })}
                />
              </label>
              <label>
                Resources:
                <input
                  type="text"
                  value={newConference.resources}
                  onChange={(e) => setNewConference({ ...newConference, resources: e.target.value })}
                />
              </label>
              <label>
                Image:
                <input type="file" name="img" onChange={handleImageChange} />
              </label>
              <button onClick={handleUpdateConference}>Update</button>
              <button onClick={closePopupOfEdit}>Cancel</button>
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

export default Conferences;
