import axios from "axios";

export const getAllConferences = () => {
  return (dispatch) => {
    axios
      .get(`https://ukbackendproject.onrender.com/confrences/getAll`)
      .then((response) => {
        const confrences = response.data.data;
        dispatch({
          type: "getAllConferences",
          payload: confrences,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
};
export const getAllEnngagedConferences = (user_id) => {
  return (dispatch) => {
    axios
      .get(`https://ukbackendproject.onrender.com/EngaConference/getEngagedConf/${user_id}`)
      .then((response) => {
        const confrences = response.data.data;
        dispatch({
          type: "getEngagedConferences",
          payload: confrences,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
};
export const engageToConference = (conference_id, user_id) => {
  return (dispatch) => {
    axios
      .post('https://ukbackendproject.onrender.com/EngaConference/engageToConference', {
        confrence_id: conference_id, 
        user_id: user_id,
      })
      .then((response) => {
        dispatch({
           type: 'engageToConference', 
       });
      })
      .catch((error) => {
        console.error(error.toString()); 
        console.log(error.toString())
      });
  };
}; 
export const AddConf = (formData) => {
  return (dispatch) => {
    axios
      .post(`https://ukbackendproject.onrender.com/confrences/AddConference`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        dispatch({ 
          type: 'addConf',
       });
      })
      .catch((error) => {
        console.log(error);
      });
  };
 };
export const deleteCon = (Id) => {
  return (dispatch) => {
    axios
      .delete(`https://ukbackendproject.onrender.com/confrences/deleteConf/${Id}`)
      .then((response) => {
        dispatch({
          type: "deleteConf",
          payload: Id,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
};