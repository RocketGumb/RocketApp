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
			<Provider store={store}>
				<Router>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/signin" component={Login} />
						<Route path="/signup" component={Register} />
						<Route path="/all" component={All} />
						<Route component={NotFound} />
					</Switch>
				</Router>
			</Provider>
		);
	}
}

export default App;
