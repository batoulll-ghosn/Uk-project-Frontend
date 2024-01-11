const workshopReducer = (state = [], action) => {
    switch (action.type) {
      case "getAllWorkshops":
        return action.payload;
        case "getEngagedWorkshops":
        return action.payload;
    case "engageToWorkshop":
        return action.payload;
      default:
       return state;
    }
    };
    export default workshopReducer;