import axios from "axios";

export const getAllCourses = () => {
  return (dispatch) => {
    axios
      .get(`https://ukbackendproject.onrender.com/courses/getAll`)
      .then((response) => {
        const courses = response.data.data;
        dispatch({
          type: "getAllCourses",
          payload: courses,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
};
export const engageToCourse = (course_id,user_id) => {
  return (dispatch) => {
    console.log(course_id);
    console.log(user_id);
    axios
      .post('https://ukbackendproject.onrender.com/courses/EngageToCourse', {
        course_id: course_id, 
        user_id: user_id,
      })
      .then((response) => {
        dispatch({ type: 'engageToCourse', payload: response.data });
      })
      .catch((error) => {
        console.error(error.toString()); 
        console.log(error.toString())
      });
  };
}; 