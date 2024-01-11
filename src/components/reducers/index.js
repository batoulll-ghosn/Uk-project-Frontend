import { combineReducers } from "redux";
import userReducer from "./user";
import courseReducer from "./course";
import conferenceReducer from "./conference";
import workshopsReducer from "./workshop";
import scheduleReducer from "./schedule";
const allReducers = combineReducers({
  users : userReducer,
  courses:courseReducer,
  conferences:conferenceReducer,
  workshops: workshopsReducer,
  schedules:scheduleReducer
});

export default allReducers;