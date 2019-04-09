import React from "react";
import { Redirect, Route } from "react-router-dom";

// Wrapper for private route
export default function PrivateRoute({
	component: Component,
	token,
	redirectPath,
	...rest
}) {
	return (
		<Route
			{...rest}
			render={props =>
				token === true ? (
					<Component {...props} />
				) : (
					<Redirect to={redirectPath} />
				)
			}
		/>
	);
}
