import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { connect } from "react-redux";

import "./scss/main.scss";
/**
 * @TODO Include fonts FontAwesome
 */

import All from "./pages/All";
import Register from "./pages/Register";
import Login from "./pages/Login";

const Home = () => {
	return (
		<Fragment>
			<h1>Home</h1>
			<Link to="/all">Конетнт</Link>
			<Link to="/signin">Войти</Link>
			<Link to="/signup">Регистрация</Link>
		</Fragment>
	);
};

const NotFound = () => {
	return <h1>NotFound</h1>;
};

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<PrivateRoute
						token={this.props.token === null}
						path="/signin"
						component={Login}
						redirectPath="/all"
					/>
					<PrivateRoute
						token={this.props.token === null}
						path="/signup"
						component={Register}
						redirectPath="/all"
					/>
					<PrivateRoute
						token={this.props.token !== null}
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
