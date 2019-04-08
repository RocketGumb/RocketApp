import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {
	message: "",
	emailExists: false,
	status: null,
	id: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_ERRORS:
			return {
				message: action.payload.message.message,
				emailExists: action.payload.message.emailExists,
				status: action.payload.status,
				id: action.payload.id
			};
		case CLEAR_ERRORS:
			return {
				message: "",
				emailExists: false,
				status: null,
				id: null
			};
		default:
			return state;
	}
}
