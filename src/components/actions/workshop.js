import axios from "axios";
export const getAllWorkshops = () => {
  return (dispatch) => {
    axios
      .get(`https://ukbackendproject.onrender.com/workshops/getAll`)
      .then((response) => {
    
        const workshops = response.data.data;
        dispatch({
          type: "getAllWorkshops",
          payload: workshops,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
};
export const getWorkshopId = (id) => {
  
  return (dispatch) => {
    axios
      .get(`https://ukbackendproject.onrender.com/workshops/getWorkshopById/${id}`)
      .then((response) => {
    
        const workshops = response.data.data[0];
        dispatch({
          type: "getWorkshopById",
          payload: workshops,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
};
export const engageToWorkshop = (workshop_id, user_id) => {
  return (dispatch) => {
    axios
      .post('https://ukbackendproject.onrender.com/workshops/engageToWorshop', {
        workshop_id: workshop_id, 
        user_id: user_id,
      })
      .then((response) => {
        dispatch({ type: 'engageToWorkshop', });
      })
      .catch((error) => {
        console.error(error.toString()); 
        console.log(error.toString())
      });
  };
}; 
export const getAllEngagedWorkshops = (user_id) => {
  return (dispatch) => {
    axios
      .get(`https://ukbackendproject.onrender.com/workshops/getEngagedWorkshops/${user_id}`)
      .then((response) => {
        const workshops = response.data.data;
        dispatch({
          type: "getEngagedWorkshops",
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
};
export const AddWorkshop = (formData) => {
  console.log(formData)
  return (dispatch) => {
    axios
      .post(`https://ukbackendproject.onrender.com/workshops/AddWorkshop`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        dispatch({ 
          type: 'addWorkshop',
       });
      })
      .catch((error) => {
        console.log(error);
      });
  };
 };
export const deleteWorkshop = (Id) => {
  return (dispatch) => {
    axios
      .delete(`https://ukbackendproject.onrender.com/workshops/deleteWorkshop/${Id}`)
      .then((response) => {
        dispatch({
          type: "deleteWorkshop",
          payload: Id,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
};
export const updateWorkshop = (Id,newWorkshop) => {
  return (dispatch) => {
    axios
      .put(`https://ukbackendproject.onrender.com/workshops/EditWorkshop/${Id}`, newWorkshop, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        const workshop = response.data.user;
        dispatch({
          type: "updateWorkshop",
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
};