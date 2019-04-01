import { GET_TASKS, ADD_TASK, DELETE_TASK } from "../actions/types";

const initialState = {
	tasks: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_TASKS:
			return {
				tasks: action.payload.map(task => {
					return {
						id: task._id,
						title: task.title
					};
				})
			};
		case ADD_TASK:
			return {
				tasks: [
					...state.tasks,
					{
						id: action.payload._id,
						title: action.payload.title
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
