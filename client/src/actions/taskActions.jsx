import { GET_TASKS, ADD_TASK, DELETE_TASK } from "./types";
import axios from "axios";

export const getTasks = () => dispatch => {
	axios.get("/api/tasks").then(res =>
		dispatch({
			type: GET_TASKS,
			payload: res.data
		})
	);
};

export const addTask = title => dispatch => {
	axios.post("/api/tasks", { title }).then(res =>
		dispatch({
			type: ADD_TASK,
			payload: res.data
		})
	);
};

export const deleteTask = id => dispatch => {
	axios.delete(`/api/tasks/${id}`).then(res => {
		if (res.data.success) {
			dispatch({
				type: DELETE_TASK,
				payload: res.data
			});
		}
	});
};
