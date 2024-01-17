const conferenceReducer = (state = [], action) => {
    switch (action.type) {
      case "getAllConferences":
        return action.payload;
        case "getAllConfWh":
          return action.payload;
          
      case "getEngagedConferences":
        return action.payload;
      case "engageToConference":
        return action.payload;
        case 'addConf':
          return action.payload;
          case "deleteConf":
            return state.filter((course) => course.id !== action.payload);
            case 'updateConf':
           return action.payload;
           case 'updateConfToPaid':
        return action.payload;
        case 'updateConfToNotPaid':
        return action.payload;
    
      default:
       return state;
    }
    };
    export default conferenceReducer;