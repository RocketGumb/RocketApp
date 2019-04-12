import { GET_TASKS, ADD_TASK, DELETE_TASK } from "../actions/types";

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
      return {
        tasks: tasks.filter(task => task.completed === false)
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
