import { combineReducers } from "redux";
import userReducer from "./user";
import courseReducer from "./course";
import conferenceReducer from "./conference";
import workshopsReducer from "./workshop"
const allReducers = combineReducers({
  users : userReducer,
  courses:courseReducer,
  conferences:conferenceReducer,
  workshops: workshopsReducer
});

export default allReducers;