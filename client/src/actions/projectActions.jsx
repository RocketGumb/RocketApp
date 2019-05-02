import { GET_PROJECTS, GET_TASKS_FOR_PROJECTS, ADD_PROJECT } from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorAction";

// Get all Projects
export const getProjects = id => (dispatch, getState) => {
	axios
		.get(`/api/projects/${id}`, tokenConfig(getState))
		.then(res =>
			dispatch({
				type: GET_PROJECTS,
				payload: res.data
			})
		)
		.catch(error =>
			dispatch(returnErrors(error.responce.data, error.responce.status))
		);
};

// Get tasks for project
export const getTasksForPoject = id => (dispatch, getState) => {
	axios
		.get(`/api/projects/${id}/tasks`, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: GET_TASKS_FOR_PROJECTS,
				payload: res.data
			});
		})
		.catch(error =>
			dispatch(returnErrors(error.responce.data, error.responce.status))
		);
};

// Add new project
export const addProject = (id, title) => (dispatch, getState) => {
	axios
		.post("/api/projects", { id, title }, tokenConfig(getState))
		.then(res =>
			dispatch({
				type: ADD_PROJECT,
				payload: res.data
			})
		)
		.catch(error =>
			dispatch(returnErrors(error.responce.data, error.responce.status))
		);
};
