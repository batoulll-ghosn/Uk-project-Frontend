const conferenceReducer = (state = [], action) => {
    switch (action.type) {
      case "getAllConferences":
        return action.payload;
      case "getEngagedConferences":
        return action.payload;
      case "engageToConference":
        return action.payload;
      default:
       return state;
    }
    };
    export default conferenceReducer;