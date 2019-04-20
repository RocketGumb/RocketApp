import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import store from "../store";
import { loadUser } from "../actions/authActions";

import Header from "./template/Header";
import Sidebar from "../containers/Sidebar";
import Tasks from "./Tasks";
import Charts from "./Charts";
import Footer from "./template/Footer";

class All extends Component {
	componentDidMount() {
		store.dispatch(loadUser());
	}
	render() {
		return (
			<Fragment>
				<Header />
				<section className="dashboard">
					<Sidebar />
					<section className="content">
						<Switch>
							<Route path="/all/tasks" component={Tasks} />
							<Route path="/all/charts" component={Charts} />
						</Switch>
						<Footer />
					</section>
				</section>
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		isLoading: state.auth.isLoading
	};
};

export default connect(
	mapStateToProps,
	null
)(All);
