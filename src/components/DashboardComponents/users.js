import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers, getUsersByEmail, getUsersByFullName } from '../actions/user';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Users = () => {
 const users = useSelector((state) => state.users);
 const dispatch = useDispatch();

 const [searchTerm, setSearchTerm] = useState('');
 const [searchType, setSearchType] = useState('email');
 const [filteredUsers, setFilteredUsers] = useState([]);

 useEffect(() => {
   dispatch(getAllUsers());
 }, []);

 const handleSearch = () => {
   let results;
   if (searchType === 'email') {
     results = users.filter(user => user.email.includes(searchTerm));
   } else if (searchType === 'fullName') {
     results = users.filter(user => user.fullName.includes(searchTerm));
   }
   setFilteredUsers(results);
 };

 return (
   <div>
     <input
       type="text"
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)}
       placeholder="Enter search term"
     />
     <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
       <option value="email">Email</option>
       <option value="fullName">Full Name</option>
     </select>
     <button onClick={handleSearch}>Search</button>

     {filteredUsers.length > 0 && (
       <div className='the-div-of-users'>

         <table className='the-users-table'>
           <thead>
             <tr>
               <th>ID</th>
               <th>Full Name</th>
               <th>Email</th>
               <th>Role</th>
               <th>Created At</th>
             </tr>
           </thead>
           <tbody>
             {filteredUsers.map((user) => (
               <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     )}

     <div className='the-div-of-users'>
       <table className='the-users-table'>
         <thead>
           <tr>
             <th>ID</th>
             <th>Full Name</th>
             <th>Email</th>
             <th>Role</th>
             <th>Created At</th>
           </tr>
         </thead>
         <tbody>
           {users.map((user) => (
             <tr key={user.id}>
               <td>{user.id}</td>
               <td>{user.fullName}</td>
               <td>{user.email}</td>
               <td>{user.role}</td>
               <td>{new Date(user.created_at).toLocaleDateString()}</td>
             </tr>
           ))}
         </tbody>
       </table>
     </div>
   </div>
 );
};

export default Users;
