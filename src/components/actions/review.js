import axios from "axios";
export const getAllReviews = () => {
    return (dispatch) => {
      axios
        .get('https://ukbackendproject.onrender.com/EngaConference/getAllTestimonial')
        .then((response) => {
          const reviews = response.data.data;
          dispatch({
             type: 'getAllReviews', 
             payload:reviews,
         });
        })
        .catch((error) => {
          console.error(error.toString()); 
          console.log(error.toString())
        });
    };
  };
export const deleteReview = (Id) => {
    return (dispatch) => {
      axios
        .delete(`https://ukbackendproject.onrender.com/EngaConference/deleteTestimonial/${Id}`)
        .then((response) => {
          dispatch({
            type: "deleteReview",
            payload: Id,
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
  };
   export const AddReview = (user_id, formData) => {
     return (dispatch) => {
       axios
         .post(`https://ukbackendproject.onrender.com/EngaConference/AddTestimonial/${user_id}`, formData, {})
         .then((response) => {
           dispatch({
             type: 'addReview', 
           });
         })
         .catch((error) => {
           console.log(error);
         });
     };
   };
   