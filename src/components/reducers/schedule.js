const scheduleReducer = (state = [], action) => {
    switch (action.type) {
      case "getScheduleOfCourse":
         return action.payload;
      default:
       return state;
    }
    };
export default scheduleReducer;