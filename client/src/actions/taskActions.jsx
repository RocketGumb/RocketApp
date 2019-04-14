import { GET_TASKS, UPDATE_TASK, ADD_TASK, DELETE_TASK } from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorAction";

export const getTasks = id => (dispatch, getState) => {
	axios
		.get(`/api/tasks/${id}`, tokenConfig(getState))
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
	console.log(data);
	axios
		.put(`/api/tasks/${id}`, data, tokenConfig(getState))
		.then(res => {
			if (res.data.success) {
				dispatch({
					type: UPDATE_TASK,
					payload: res.data
				});
			}
		})
		.catch(error =>
			dispatch(returnErrors(error.responce.data, error.responce.status))
		);
};

export const addTask = (id, title) => (dispatch, getState) => {
	axios
		.post("/api/tasks", { id, title }, tokenConfig(getState))
		.then(res =>
			dispatch({
				type: ADD_TASK,
				payload: res.data
			})
		)
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
