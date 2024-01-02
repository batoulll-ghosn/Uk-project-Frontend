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
        const response = await axios.get(`http://localhost:8000/users/getUserByEmail/${email}`);
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
   
   