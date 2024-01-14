const scheduleReducer = (state = [], action) => {
    switch (action.type) {
      case "getScheduleOfCourse":
         return action.payload;
      case "getSchedule":
         return action.payload;
      case "addSchedule":
         return action.payload;
      default:
       return state;
    }
    };
export default scheduleReducer;