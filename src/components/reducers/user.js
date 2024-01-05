const userReducer = (state = [], action) => {
    switch (action.type) {
      case "getAll":
        return action.payload;
      case "login":
      return action.payload;
      case "getUsersByEmail":
      return action.payload ;
      case "register":
      return action.payload ;
      default:
            return state;
    }
    };
    export default userReducer;