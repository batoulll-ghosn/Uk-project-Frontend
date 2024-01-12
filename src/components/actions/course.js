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
        dispatch({ 
          type: 'engageToCourse', 
       });
      })
      .catch((error) => {
        console.error(error.toString()); 
        console.log(error.toString())
      });
  };
}; 

export const getCourseByLanguageName = (languageName) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`https://ukbackendproject.onrender.com/courses/getByLanguageName/${languageName}`);
      const users = response.data.data;
      dispatch({
        type: "getCourseByLanguageName",
        payload: users
      });
      return users;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 };
export const getCourseByType = (type) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`https://ukbackendproject.onrender.com/courses/getByType/${type}`);
      const users = response.data.data;
      dispatch({
        type: "getCourseBytype",
        payload: users
      });
      return users;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 };
 export const getCourseByLevel = (level) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`https://ukbackendproject.onrender.com/courses/getByLanguageLevel/${level}`);
      const users = response.data.data;
      dispatch({
        type: "getCourseByLevel",
        payload: users
      });
      return users;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 };
export const AddCourse = (formData) => {
  return (dispatch) => {
    axios
      .post(`https://ukbackendproject.onrender.com/courses/AddCourse`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        dispatch({ 
          type: 'ADD_COURSE',
       });
      })
      .catch((error) => {
        console.log(error);
      });
  };
 };
 export const updateCoursee = (
  Id,
  languageName, level, zoom_link,type,price,img
) => {
  const newCourse = {
    languageName, level, zoom_link,type,price,img
  };
  return (dispatch) => {
    axios
      .put(`https://ukbackendproject.onrender.com/courses/EditCourse/${Id}`, newCourse, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        const course = response.data.user;
        dispatch({
          type: "updateCourse",
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
};
export const deleteCourse = (Id) => {
  return (dispatch) => {
    axios
      .delete(`https://ukbackendproject.onrender.com/courses/deleteCourse/${Id}`)
      .then((response) => {
        dispatch({
          type: "deleteCourse",
          payload: Id,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
};