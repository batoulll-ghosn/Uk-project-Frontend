import { combineReducers } from "redux";
import userReducer from "./user";
import courseReducer from "./course";
import conferenceReducer from "./conference";
const allReducers = combineReducers({
  users : userReducer,
  courses:courseReducer,
  conferences:conferenceReducer
});

export default allReducers;