import {
	GET_TASKS,
	UPDATE_TASK,
	ADD_TASK,
	ADD_TASK_TO_PROJECT,
	UPDATE_TASK_TO_PROJECT,
	DELETE_TASK
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorAction";

export const getTasks = email => (dispatch, getState) => {
	axios
		.get(`/api/tasks?email=${email}`, tokenConfig(getState))
		.then(res =>
			dispatch({
				type: GET_TASKS,
				payload: res.data
			})
		)
		.catch(error =>
			dispatch(returnErrors(error.responce.data, error.responce.status))
		);
};

export const updateTask = (id, data) => (dispatch, getState) => {
	axios
		.put(`/api/tasks/${id}`, data, tokenConfig(getState))
		.then(res => {
			if (res.data.success) {
				dispatch({
					type: UPDATE_TASK,
					payload: res.data
				});
				dispatch({
					type: UPDATE_TASK_TO_PROJECT,
					payload: res.data
				});
			}
		})
		.catch(error =>
			dispatch(returnErrors(error.responce.data, error.responce.status))
		);
};

export const addTask = (email, title, project) => (dispatch, getState) => {
	axios
		.post("/api/tasks", { email, title, project }, tokenConfig(getState))
		.then(res => {
			if (project !== "") {
				dispatch({
					type: ADD_TASK_TO_PROJECT,
					payload: res.data
				});
			} else {
				dispatch({
					type: ADD_TASK,
					payload: res.data
				});
			}
		})
		.catch(error =>
			dispatch(returnErrors(error.responce.data, error.responce.status))
		);
};

export const deleteTask = id => (dispatch, getState) => {
	axios
		.delete(`/api/tasks/${id}`, tokenConfig(getState))
		.then(res => {
			if (res.data.success) {
				dispatch({
					type: DELETE_TASK,
					payload: res.data
				});
			}
		})
		.catch(error =>
			dispatch(returnErrors(error.responce.data, error.responce.status))
		);
};
