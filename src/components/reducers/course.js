const courseReducer = (state = [], action) => {
    switch (action.type) {
      case "getAll":
        return action.payload;
      default:
       return state;
    }
    };
    export default courseReducer;