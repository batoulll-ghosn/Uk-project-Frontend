const courseReducer = (state = [], action) => {
    switch (action.type) {
      case "getAllCourses":
        return action.payload;
        case "getAllCoursesWh":
          return action.payload;
        case "getSchedule":
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
      case "deleteSchedule":
        return state.filter((schedule) => schedule.id !== action.payload);
      case "deleteCourse":
        return state.filter((course) => course.id !== action.payload);
     case 'ADD_COURSE':
        return action.payload;
     case 'updateCourse':
        return action.payload;
     case 'updateCourseToPaid':
        return action.payload;
        case 'updateCourseToNotPaid':
        return action.payload;
      default:
       return state;
    }
    };
export default courseReducer;