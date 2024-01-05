import axios from "axios";

export const getAllCourses = () => {
  return (dispatch) => {
    axios
      .get(`https://ukbackendproject.onrender.com/courses/getAll`)
      .then((response) => {
        console.log(response.data)
        const courses = response.data.data;
        dispatch({
          type: "getAll",
          payload: courses,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
};