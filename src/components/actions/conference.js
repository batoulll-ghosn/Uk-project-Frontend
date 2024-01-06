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