const reviewReducer = (state = [], action) => {
    switch (action.type) {
        case "getAllReviews":
            return action.payload;
        case "addReview":
                return action.payload;
        case "deleteReview":
          return state.filter((user) => user.id !== action.payload);
      default:
       return state;
    }
    };
    export default reviewReducer;