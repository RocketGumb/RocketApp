import {
	GET_PROJECTS,
	GET_TASKS_FOR_PROJECTS,
	CLEAR_TASKS_FOR_PROJECTS,
	ADD_TASK_TO_PROJECT,
	UPDATE_TASK_TO_PROJECT,
	ADD_PROJECT,
	UPDATE_PROJECT,
	DELETE_PROJECT
} from "../actions/types";

const initialState = {
	projects: [],
	projectTasks: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_PROJECTS:
			const projects = action.payload.map(project => {
				return {
					id: project._id,
					title: project.title,
					desc: project.desc,
					users: project.users
				};
			});
			return {
				projectTasks: [...state.projectTasks],
				projects
			};
		case CLEAR_TASKS_FOR_PROJECTS:
			return {
				projects: [...state.projects],
				projectTasks: []
			};
		case ADD_PROJECT:
			return {
				projects: [
					...state.projects,
					{
						id: action.payload._id,
						title: action.payload.title,
						desc: action.payload.desc,
						users: action.payload.users
					}
				],
				projectTasks: [...state.projectTasks]
			};
		case ADD_TASK_TO_PROJECT:
			return {
				projects: [...state.projects],
				projectTasks: [
					...state.projectTasks,
					{
						id: action.payload._id,
						title: action.payload.title,
						priority: 0,
						completed: false,
						project: action.payload.project_id
					}
				]
			};
		case UPDATE_TASK_TO_PROJECT:
			const data = action.payload.data;
			return {
				projects: [...state.projects],
				projectTasks: state.projectTasks.map(task => {
					if (data._id === task.id) {
						task = {
							...task,
							title: data.title,
							priority: data.priority,
							completed: data.completed,
							project: data.project_id
						};
					}
					return task;
				})
			};
		case GET_TASKS_FOR_PROJECTS:
			const projectTasks = action.payload.map(task => {
				return {
					id: task._id,
					title: task.title,
					priority: task.priority,
					completed: task.completed,
					project: task.project_id
				};
			});
			return {
				projects: [...state.projects],
				projectTasks: [...state.projectTasks, ...projectTasks]
			};
		case UPDATE_PROJECT:
			const dataUpdate = action.payload.data;
			return {
				projects: state.projects.map(project => {
					if (dataUpdate._id === project.id) {
						project = {
							...project,
							title: dataUpdate.title,
							desc: dataUpdate.desc,
							users: dataUpdate.users
						};
					}
					return project;
				}),
				projectTasks: [...state.projectTasks]
			};
		case DELETE_PROJECT:
			return {
				projects: state.projects.filter(
					project => project.id !== action.payload.id
				),
				projectTasks: [...state.projectTasks]
			};
		default:
			return state;
	}
}
