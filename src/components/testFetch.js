import { React, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {getAllUsers} from './actions/user'
const User = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  return (
    <div>
      <h2>All Users</h2>
      {users.loading && <div>loading </div>}
      {!users.loading && users.error ? <div>Error: {users.error}</div> : null}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>{user.email}</p>
           </li>
        ))}
      </ul>
    </div>
  );
};

export default User;