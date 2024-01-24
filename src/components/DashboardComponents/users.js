import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import {
  getAllUsers,
  deleteUser,
  updateUser,
  updateUsertoNonActive,
  updateUsertoActive,
  AddUser,
  updateUsertoTrainer,
  updateUsertoStudent,
} from '../actions/user';

const Users = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('email');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState(null);
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const [showAddUserPopup, setShowAddUserPopup] = useState(false);
  const [addUserFormData, setAddUserFormData] = useState({
    email: '',
    fullName: '',
    phone: '',
    password: '',
    role: '',
  });


  const handleSearch = () => {
    let results;
    if (searchType === 'email') {
      results = users.filter((user) => user.email.includes(searchTerm));
    } else if (searchType === 'fullName') {
      results = users.filter((user) => user.fullName.includes(searchTerm));
    }
    setFilteredUsers(results);
  };

  const handleDelete = (userId) => {
    setShowDeletePopup(true);
    setUserToDelete(userId);
  };

  const confirmDelete = () => {
    dispatch(deleteUser(userToDelete));
    setShowDeletePopup(false);
    toast.success('User Deleted Successfully!');
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
  };

  const handleUpdate = (user) => {
    setUserToUpdate(user);
    setNewFullName(user.fullName);
    setNewEmail(user.email);
    setShowUpdatePopup(true);
  };

  const confirmUpdate = () => {
    dispatch(updateUser(userToUpdate.id, newFullName, newEmail));
    setShowUpdatePopup(false);
    setNewFullName('');
    setNewEmail('');
    toast.success('User Updated Successfully!');
  };

  const handleFullNameChange = (e) => {
    setNewFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleToggleActive = (userId, isActive) => {
    if (isActive) {
      dispatch(updateUsertoNonActive(userId));
      toast.success('Updated to non-active user successfully!');
    } else if (!isActive) {
      dispatch(updateUsertoActive(userId));
      toast.success('Updated to active user successfully!');
    }
  };

  const cancelUpdate = () => {
    setShowUpdatePopup(false);
  };

  const handleStatusChange = (userId, isActive) => {
    if (!isActive) {
      dispatch(updateUsertoNonActive(userId));
    } else if (isActive) {
      dispatch(updateUsertoActive(userId));
    }
  };

  const handleAddUser = () => {
    setShowAddUserPopup(true);
  };

  const handleAddUserFormChange = (e) => {
    const { name, value } = e.target;
    setAddUserFormData({
      ...addUserFormData,
      [name]: value,
    });
  };

  

  const confirmAddUser = () => {
    dispatch(AddUser(addUserFormData));
    setShowAddUserPopup(false);
    setAddUserFormData({
      email: '',
      fullName: '',
      phone: '',
      password: '',
      role: '',
    });
    toast.success('User Added Successfully!');
  };

  const cancelAddUser = () => {
    setShowAddUserPopup(false);
    setAddUserFormData({
      email: '',
      fullName: '',
      phone: '',
      password: '',
      role: '',
    });
  };

  const handleRoleSwitch = (userId, currentRole) => {
    if (currentRole === 'trainer') {
      dispatch(updateUsertoStudent(userId));
      toast.success('Role switched to Student successfully!');
    } else if (currentRole === 'student') {
      dispatch(updateUsertoTrainer(userId));
      toast.success('Role switched to Trainer successfully!');
    }
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      data.forEach((user) => {
        dispatch(AddUser(user));
      });
    };
    reader.readAsBinaryString(file);
   };
   
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch,handleRoleSwitch,handleToggleActive,confirmUpdate,handleAddUser,confirmDelete]);
  return (
    <div>
      <div className='first-div-in-users'>
        <button onClick={handleAddUser} className="left-side-of-header-button">+ Add User</button>
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleSearch();
            }}
            placeholder="Enter value"
            className="left-side-of-header-buttonnn"
          />
          <select value={searchType} className="left-side-of-header-buttonnnn" onChange={(e) => setSearchType(e.target.value)}>
            <option value="email">Email</option>
            <option value="fullName">Full Name</option>
          </select>
         
        </div>
      </div>

      {filteredUsers.length > 0 && (
        <div className="the-div-of-users">
          <table className="the-users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Active</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user,index) => (
                <tr key={user.id}>

                  <td>{index+1}</td>
                  
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}{(user.role === 'trainer' || user.role === 'student') && (
                      <span
                        className="role-switch-arrow"
                        onClick={() => handleRoleSwitch(user.id, user.role)}
                      >
                        ⇄


                      </span>
                    )}</td>
                  <td>
                    <p>YES </p>
                    <input
                      type="checkbox"
                      checked={user.active === 1}
                      onChange={() => handleToggleActive(user.id, user.active === 1)}
                    />
                  </td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td>
                  <button onClick={() => handleUpdate(user)}><img className='bin-in-tables' src='./images/pen.svg'/></button>
                  <button onClick={() => handleDelete(user.id)}><img className='bin-in-tables' src='./images/bin.svg'/></button>
                
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
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

      {showUpdatePopup && (
        <div className="Confoverlay">
          <div className="Conferencepopup">
            <div className="Conferencepopup-content">
              <p>Edit User Details:</p>
              <div className='row-in-Add-Popup'>
              <input
                type="text"
                value={newFullName}
                onChange={handleFullNameChange}
                placeholder="Enter new Full Name"
                className='innput-of-popup'
              />
              <input
                type="text"
                value={newEmail}
                onChange={handleEmailChange}
                placeholder="Enter new Email"
                className='innput-of-popup'
              /> </div>
              <div className="buttonsOfUpdatePopupp">
                <button className="left-side-of-header-button" onClick={confirmUpdate}>
                  Update
                </button>
                <button className="left-side-of-header-button" onClick={cancelUpdate}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddUserPopup && (
        <div className="Confoverlay">
          <div className="Conferencepopup">
            <div className="Conferencepopup-contentttt">
              <p>Add New User:</p>
              <div className='row-in-Add-Popup'>  <input
                type="text"
                name="email"
                value={addUserFormData.email}
                onChange={handleAddUserFormChange}
                placeholder="Enter Email"
                className='input-of-popup'
              />
              <input
                type="text"
                name="fullName"
                value={addUserFormData.fullName}
                onChange={handleAddUserFormChange}
                placeholder="Enter Full Name"
                className='input-of-popup'
              /></div>
                <div className='row-in-Add-Popup'>
              <input
                type="text"
                name="phone"
                value={addUserFormData.phone}
                onChange={handleAddUserFormChange}
                placeholder="Enter Phone"
                className='input-of-popup'
              />
              <input
                type="password"
                name="password"
                value={addUserFormData.password}
                onChange={handleAddUserFormChange}
                placeholder="Enter Password"
                className='input-of-popup'
              /></div>
                <div className='row-in-Add-Popupp'>
              <input
                type="text"
                name="role"
                value={addUserFormData.role}
                onChange={handleAddUserFormChange}
                placeholder="Enter Role"
                className='input-of-popup'
              />
              </div>
              <div className="buttonsOfUpdatePopupp">
                <button className="left-side-of-header-button" onClick={confirmAddUser}>
                  Add User
                </button>
                <button className="left-side-of-header-button" onClick={cancelAddUser}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <p className='the-text-before-users-div'>You have {users.length} users between student and trainer!</p>
      <div className="the-div-of-users">
        <table className="the-users-table">
          <thead>
            <tr>
              <th></th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Active</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user,index) => (
              <tr key={user.id}>
                <td>{index+1}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.role}
                {(user.role === 'trainer' || user.role === 'student') && (
                    <span
                      className="role-switch-arrow"
                      onClick={() => handleRoleSwitch(user.id, user.role)}
                    >
                       ⇄
                    </span>
                  )}
                
                </td>
                <td>
                 <p>Yes</p>
                  <input
                    type="checkbox"
                    checked={user.active === 1}
                    onChange={() => handleToggleActive(user.id, user.active === 1)}
                  />
                </td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                <td>  <button onClick={() => handleUpdate(user)}><img className='bin-in-tables' src='./images/pen.svg'/></button>
                  <button onClick={() => handleDelete(user.id)}><img className='bin-in-tables' src='./images/bin.svg'/></button>
                
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
