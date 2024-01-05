import axios from "axios";

export const getAllConferences = () => {
  return (dispatch) => {
    axios
      .get(`https://ukbackendproject.onrender.com/confrences/getAll`)
      .then((response) => {
        console.log(response.data)
        const confrences = response.data.data;
        dispatch({
          type: "getAll",
          payload: confrences,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
};