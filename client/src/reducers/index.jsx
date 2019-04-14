import { combineReducers } from "redux";
import taskReducer from "./taskReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import helperReducer from "./helperReducer";

export default combineReducers({
	task: taskReducer,
	error: errorReducer,
	auth: authReducer,
	helper: helperReducer
});
