const courseReducer = (state = [], action) => {
    switch (action.type) {
      case "getAllCourses":
        return action.payload;
      case "engageToCourse":
          return action.payload;
      default:
       return state;
    }
    };
    export default courseReducer;