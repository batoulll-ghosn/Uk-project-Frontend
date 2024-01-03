import axios from "axios";

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
export const register = (fullName,email, password,phone, img) => {
    const newUser = {
      fullName,
      email,
      password,
      phone,
      img,
    };
    return (dispatch) => {
      axios
        .post(`http://localhost:8000/users/register`, newUser)
        .then((response) => {
          const user = response.data.data.user;
          const token = response.data.data.token;
          const id = response.data.data.id;
          dispatch({
            type: "register",
            payload: {user,token, id}
          });
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
    };
   };
   
   