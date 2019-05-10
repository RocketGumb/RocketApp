import {
	GET_PROJECTS,
	GET_TASKS_FOR_PROJECTS,
	ADD_PROJECT,
	UPDATE_PROJECT,
	CLEAR_TASKS_FOR_PROJECTS,
	DELETE_PROJECT
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorAction";

// Get all Projects
export const getProjects = email => (dispatch, getState) => {
	axios
		.get(`/api/projects?email=${email}`, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: GET_PROJECTS,
				payload: res.data.projects
			});
			return res.data.projects;
		})
		// Get tasks for project
		.then(projects => {
			projects.forEach(project => {
				axios
					.get(
						`/api/projects/tasks?project=${project._id}`,
						tokenConfig(getState)
					)
					.then(res => {
						dispatch({
							type: GET_TASKS_FOR_PROJECTS,
							payload: res.data
						});
					})
					.catch(error =>
						dispatch(returnErrors(error.responce.data, error.responce.status))
					);
			});
		})
		.catch(error =>
			dispatch(returnErrors(error.responce.data, error.responce.status))
		);
};

// Clear tasks for projects
export const clearTasksForProjects = () => {
	return {
		type: CLEAR_TASKS_FOR_PROJECTS
	};
};

// Update project
export const updateProject = (id, data) => (dispatch, getState) => {
	axios
		.put(`/api/projects/${id}`, data, tokenConfig(getState))
		.then(res => {
			if (res.data.success) {
				dispatch({
					type: UPDATE_PROJECT,
					payload: res.data
				});
			}
		})
		.catch(error =>
			dispatch(returnErrors(error.responce.data, error.responce.status))
		);
};

// Add new project
export const addProject = (id, email, title) => (dispatch, getState) => {
	axios
		.post("/api/projects", { id, email, title }, tokenConfig(getState))
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

// Delete project
export const deleteProject = id => (dispatch, getState) => {
	axios
		.delete(`/api/projects/${id}`, tokenConfig(getState))
		.then(res => {
			if (res.data.success) {
				dispatch({
					type: DELETE_PROJECT,
					payload: res.data
				});
			}
		})
		.catch(error =>
			dispatch(returnErrors(error.responce.data, error.responce.status))
		);
};
