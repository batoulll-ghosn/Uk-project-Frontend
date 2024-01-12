const userReducer = (state = [], action) => {
  switch (action.type) {
    case "getAll":
      return action.payload;
    case "login":
      return action.payload;
    case "getUsersByEmail":
      return action.payload;
    case "getUsersByFullName":
      return action.payload;
    case "updateUser":
      return state.map((user) =>
        user._id === action.payload.Id ? action.payload.user : user
      );
    case "updateUserInfo":
        return state.map((user) =>
          user._id === action.payload.Id ? action.payload.user : user
        );
    case "updateNonActive":
      return state.map((user) =>
        user._id === action.payload.Id ? action.payload.user : user
      );
    case "updateActive":
        return state.map((user) =>
          user._id === action.payload.Id ? action.payload.user : user
        );
    case "updateUsertoTrainer":
        return state.map((user) =>
          user._id === action.payload.Id ? action.payload.user : user
        );
    case "updateUsertoStudent":
          return state.map((user) =>
            user._id === action.payload.Id ? action.payload.user : user
          );
    case "deleteUser":
      return state.filter((user) => user.id !== action.payload);
    case "register":
      return action.payload;
      case 'ADD_USER':
        return action.payload;
    default:
      return state;
  }
 };
 
 export default userReducer;
 