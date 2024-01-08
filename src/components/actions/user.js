import axios from "axios";
import { toast } from 'react-toastify';
export const getAllUsers = () => {
  return (dispatch) => {
    axios
      .get(`https://ukbackendproject.onrender.com/users/getAll`)
      .then((response) => {
        console.log(response.data)
        const users = response.data.data;
        dispatch({
          type: "getAll",
          payload: users,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
};
export const login = (Email, password) => {
    return (dispatch) => {
      return axios
        .post(`https://ukbackendproject.onrender.com/users/login`, { Email, password })
        .then((response) => {
          dispatch({
            type: "login",
            payload: response.data
          });
          return response.data;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          throw error;
        });
    };
   };
export const getUsersByEmail = (email) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`https://ukbackendproject.onrender.com/users/getUserByEmail/${email}`);
        const users = response.data.data;
        dispatch({
          type: "getUsersByEmail",
          payload: users
        });
        return users;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
   };
export const getUsersByFullName = (fullName) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`https://ukbackendproject.onrender.com/users/getUserByFullName/${fullName}`);
        const users = response.data.data;
        dispatch({
          type: "getUsersByFullName",
          payload: users
        });
        return users;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
   };
export const register = (formData) => {
    
    return (dispatch) => {
      axios
 .post(`https://ukbackendproject.onrender.com/users/register`, formData,{
  headers: {
  'Content-Type': 'multipart/form-data',
},})
 
 .then((response) => {
 })
 .catch((error) => {
   if (error.response) {
     // The request was made and the server responded with a status code outside of the range of 2xx
     console.log(error.response.data);
     console.log(error.response.status);
     console.log(error.response.headers);
   } else if (error.request) {
     // The request was made but no response was received
     console.log(error.request);
   } else {
     // Something happened in setting up the request that triggered an Error
     console.log('Error', error.message);
   }
   console.log(error.config);
 });
    }
   };
export const AddUser = (formData) => {
    return (dispatch) => {
      axios
        .post(`https://ukbackendproject.onrender.com/users/addUser`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          // Handle the response from the server here
          // For example, you could dispatch an action to add the new user to your Redux store
          dispatch({ type: 'ADD_USER', payload: response.data });
        })
        .catch((error) => {
          // Handle the error here
          console.log(error);
        });
    };
   };
export const deleteUser = (Id) => {
    return (dispatch) => {
      axios
        .delete(`https://ukbackendproject.onrender.com/users/deleteUser/${Id}`)
        .then((response) => {
          dispatch({
            type: "deleteUser",
            payload: Id,
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
  };
export const updateUser = (
    Id,
    fullName,
    email
  ) => {
    const newUser = {
      fullName,
      email
    };
    return (dispatch) => {
      axios
        .put(`https://ukbackendproject.onrender.com/users/AdminUpdateUser/${Id}`, newUser)
        .then((response) => {
          const user = response.data.user;
          dispatch({
            type: "updateUser",
            payload: { user, Id },
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
  };
export const updateUsertoNonActive = (Id) => {
    return (dispatch) => {
      axios
        .put(`https://ukbackendproject.onrender.com/users/updateToNonActiveUser/${Id}`)
        .then((response) => {
          const user = response.data.user;
          dispatch({
            type: "updateUsertoNonActive",
            payload: { user, Id },
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
   };
export const updateUsertoActive = (Id) => {
    return (dispatch) => {
      axios
        .put(`https://ukbackendproject.onrender.com/users/updateToActiveUser/${Id}`)
        .then((response) => {
          const user = response.data.user;
          dispatch({
            type: "updateUsertoActive",
            payload: { user, Id },
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
   };
export const updateUsertoTrainer = (Id) => {
    return (dispatch) => {
      axios
        .put(`https://ukbackendproject.onrender.com/users/switchToTrainer/${Id}`)
        .then((response) => {
          const user = response.data.user;
          dispatch({
            type: "updateUsertoTrainer",
            payload: { user, Id },
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
   };
export const updateUsertoStudent = (Id) => {
    return (dispatch) => {
      axios
        .put(`https://ukbackendproject.onrender.com/users/switchToStudent/${Id}`)
        .then((response) => {
          const user = response.data.user;
          dispatch({
            type: "updateUsertoStudent",
            payload: { user, Id },
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
   };
   