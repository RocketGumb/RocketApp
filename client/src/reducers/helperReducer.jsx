import { TOGGLE_SIDEBAR } from "../actions/types";

const initialState = {
	sidebarState: true
};

export default function(state = initialState, action) {
	switch (action.type) {
		case TOGGLE_SIDEBAR:
			return {
				sidebarState: action.payload.sidebarState
			};
		default:
			return state;
	}
}
