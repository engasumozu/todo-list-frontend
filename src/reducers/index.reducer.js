import { combineReducers } from "redux";
import authorization from "./authorization.reducer";
import message from "./message.reducer";

export default combineReducers({
  authorization,
  message,
});