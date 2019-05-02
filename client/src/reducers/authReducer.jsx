import {
	// USER_LOADING,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL
} from "../actions/types";

const inititalState = {
	token: localStorage.getItem("token"),
	isAuthenticated: false
};

export default function(state = inititalState, action) {
	switch (action.type) {
		// case USER_LOADING:
		// 	return {
		// 		...state,
		// 		isLoading: true
		// 	};
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload
			};
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			localStorage.setItem("token", action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true
			};
		case LOGOUT_SUCCESS:
			localStorage.setItem("token", "");
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false
			};
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case REGISTER_FAIL:
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false
			};
		default:
			return state;
	}
}
