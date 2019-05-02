import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { connect } from "react-redux";

import "./scss/main.scss";

import All from "./pages/All";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

const NotFound = () => {
	return <h1>NotFound</h1>;
};

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					{/* <Route exact path="/" component={Home} /> */}
					<PrivateRoute
						exact
						token={!this.props.token}
						path="/"
						component={Home}
						redirectPath="/all"
					/>
					<PrivateRoute
						token={!this.props.token}
						path="/signin"
						component={Login}
						redirectPath="/all"
					/>
					<PrivateRoute
						token={!this.props.token}
						path="/signup"
						component={Register}
						redirectPath="/all"
					/>
					<PrivateRoute
						token={this.props.token !== ""}
						path="/all"
						component={All}
						redirectPath="/signin"
					/>
					<Route component={NotFound} />
				</Switch>
			</Router>
		);
	}
}

const mapStateToProps = state => {
	return {
		token: state.auth.token
	};
};

export default connect(
	mapStateToProps,
	null
)(App);
