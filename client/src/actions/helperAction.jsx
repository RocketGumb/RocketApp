import { TOGGLE_SIDEBAR } from "./types";
// Toggle view sidebar
export const sidebarToggle = sidebarState => {
	return {
		type: TOGGLE_SIDEBAR,
		payload: {
			sidebarState
		}
	};
};
