const courseReducer = (state = [], action) => {
    switch (action.type) {
      case "getAllCourses":
        return action.payload;
      case "getCourseByLanguageName":
        return action.payload;
      case "getCourseBytype":
          return action.payload;
      case "getCourseByLevel":
            return action.payload;
      case "engageToCourse":
          return action.payload;
      case "getScheduleOfCourse":
         return action.payload;
      case "deleteUser":
          return state.filter((course) => course.id !== action.payload);
     case 'ADD_COURSE':
          return action.payload;
     case 'updateCourse':
           return action.payload;
      default:
       return state;
    }
    };
export default courseReducer;