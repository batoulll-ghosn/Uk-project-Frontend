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

export const getSchedule = () => {
    return (dispatch) => {
      axios
        .get(`https://ukbackendproject.onrender.com/courses/getSchedule`)
        .then((response) => {
          const schedule = response.data.data;
          dispatch({
            type: "getSchedule",
            payload: schedule,
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
  };
export const AddSchedule = (course_id, day, hour ) => {
    return (dispatch) => {
      axios
        .post(`https://ukbackendproject.onrender.com/courses/AddSchedule/${course_id}/${day}/${hour}`)
        .then((response) => {
          dispatch({ 
            type: 'addSchedule', 
         });
        })
        .catch((error) => {
          console.error(error.toString()); 
          console.log(error.toString())
        });
    };
  };
export const deleteSchedule = (Id) => {
    return (dispatch) => {
      axios
        .delete(`https://ukbackendproject.onrender.com/courses/deleteSchedule/${Id}`)
        .then((response) => {
          dispatch({
            type: "deleteSchedule",
            payload: Id,
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
  };