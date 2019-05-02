import { combineReducers } from "redux";
import taskReducer from "./taskReducer";
import projectReducer from "./projectReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import helperReducer from "./helperReducer";

export default combineReducers({
	task: taskReducer,
	project: projectReducer,
	error: errorReducer,
	auth: authReducer,
	helper: helperReducer
});
