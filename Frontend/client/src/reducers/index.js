import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./Users.reducer";
import postReducer from "./post.reducer";
import commentReducer from "./comment.reducer";
import likesReducer from "./likes.reducer";
import formationsReducer from "./formations.reducer";
import usersformationsReducer from "./usersFormation.reducer";
import requestFormationReducer from "./requestFormation.reducer";

export default combineReducers({
  userReducer,
  usersReducer,
  postReducer,
  commentReducer,
  likesReducer,
  formationsReducer,
  usersformationsReducer,
  requestFormationReducer,
});
