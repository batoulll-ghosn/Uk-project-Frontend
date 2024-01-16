const workshopReducer = (state = [], action) => {
    switch (action.type) {
      case "getAllWorkshops":
        return action.payload;
        case "getEngagedWorkshops":
        return action.payload;
        case "engageToWorkshop":
        return action.payload;
        case "addWorkshop":
          return action.payload;
          case "deleteWorkshop":
            return state.filter((workshop) => workshop.id !== action.payload);
            case 'updateCourse':
              return action.payload;
      default:
       return state;
    }
    };
    export default workshopReducer;