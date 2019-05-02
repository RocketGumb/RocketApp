import {
	GET_TASKS,
	UPDATE_TASK,
	ADD_TASK,
	DELETE_TASK
} from "../actions/types";

const initialState = {
	tasks: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_TASKS:
			const tasks = action.payload.map(task => {
				return {
					id: task._id,
					title: task.title,
					priority: task.priority,
					completed: task.completed
				};
			});
			return { tasks: [...tasks] };
		case UPDATE_TASK:
			const data = action.payload.data;
			return {
				tasks: state.tasks.map(task => {
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
		case ADD_TASK:
			return {
				tasks: [
					...state.tasks,
					{
						id: action.payload._id,
						title: action.payload.title,
						priority: 0,
						completed: false,
						project: action.payload.project
					}
				]
			};
		case DELETE_TASK:
			return {
				tasks: state.tasks.filter(task => task.id !== action.payload.id)
			};
		default:
			return state;
	}
}
