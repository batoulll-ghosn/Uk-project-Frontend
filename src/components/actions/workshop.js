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