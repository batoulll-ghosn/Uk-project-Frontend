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
export const engageToWorkshop = (workshop_id, user_id) => {
  return (dispatch) => {
    axios
      .post('https://ukbackendproject.onrender.com/workshops/engageToWorshop', {
        workshop_id: workshop_id, 
        user_id: user_id,
      })
      .then((response) => {
        dispatch({ type: 'engageToWorkshop', payload: response.data });
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
          payload: workshops,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
};