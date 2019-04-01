import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

// Include Redux
import { Provider } from "react-redux";
import store from "./store";

import "./scss/main.scss";
/**
 * @TODO Include fonts FontAwesome
 */

import All from "./pages/All";

const Home = () => {
	return (
		<Fragment>
			<h1>Home</h1>
			<Link to="/all">Конетнт</Link>
			<Link to="/login">Форма</Link>
		</Fragment>
	);
};

const Login = () => {
	return <h1>Login</h1>;
};

const NotFound = () => {
	return <h1>NotFound</h1>;
};

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/login" component={Login} />
						<Route path="/all" component={All} />
						<Route component={NotFound} />
					</Switch>
				</Router>
			</Provider>
		);
	}
}

export default App;
