import { combineReducers } from "redux";
import authorization from "./authorization.reducer";
import message from "./message.reducer";
import todo from "./todo.reducer"

export default combineReducers({
  authorization,
  message,
  todo
});