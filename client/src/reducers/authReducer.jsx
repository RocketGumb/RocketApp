import {
	USER_LOADING,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL
} from "../actions/types";

console.log(localStorage.getItem("token"));
console.log(typeof localStorage.getItem("token"));

const inititalState = {
	token: localStorage.getItem("token"),
	isAuthenticated: false,
	isLoading: false
};

export default function(state = inititalState, action) {
	switch (action.type) {
		case USER_LOADING:
			return {
				...state,
				isLoading: true
			};
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				user: action.payload
			};
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			localStorage.setItem("token", action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				isLoading: false
			};
		case LOGOUT_SUCCESS:
			localStorage.setItem("token", "");
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				isLoading: false
			};
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case REGISTER_FAIL:
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				isLoading: false
			};
		default:
			return state;
	}
}
