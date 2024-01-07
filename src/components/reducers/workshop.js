const workshopReducer = (state = [], action) => {
    switch (action.type) {
      case "getAllWorkshops":
        return action.payload;
      default:
       return state;
    }
    };
    export default workshopReducer;