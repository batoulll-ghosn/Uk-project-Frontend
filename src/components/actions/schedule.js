import axios from "axios";
export const getScheduleOfCourse = (user_id) => {
    return (dispatch) => {
      axios
        .get(`https://ukbackendproject.onrender.com/courses/getEngagedCourseSchedule/${user_id}`)
        .then((response) => {
          const schedule = response.data.data;
         
          dispatch({
            type: "getScheduleOfCourse",
            payload: schedule,
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
  };