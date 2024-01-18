const reviewReducer = (state = [], action) => {
    switch (action.type) {
        case "getAllReviews":
            return action.payload;
            case "getAllReviewsSelected":
                return action.payload;
            case "updateToSelected":
                return action.payload;
                case "updateToNOTSelected":
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