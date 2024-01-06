const courseReducer = (state = [], action) => {
    switch (action.type) {
      case "getAllCourses":
        return action.payload;
      default:
       return state;
    }
    };
    export default courseReducer;