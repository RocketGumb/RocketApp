import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { loadUser } from "../actions/authActions";

import Header from "../containers/Header";
import Sidebar from "../containers/Sidebar";
import Tasks from "./Tasks";
import Projects from "./Projects";
import Charts from "./Charts";
import Footer from "../containers/Footer";

class All extends Component {
	// Init user
	componentDidMount() {
		this.props.loadUser();
	}

	render() {
		const { sidebarState } = this.props;
		return this.props.isAuthenticated ? (
			<Fragment>
				<Header />
				<section className="dashboard">
					<Sidebar />
					<section className={sidebarState ? "content" : "content compact"}>
						<Switch>
							<Route exact path="/all" component={Tasks} />
							<Route exact path="/all/projects" component={Projects} />
							<Route path="/all/projects/:id" component={Projects} />
							<Route path="/all/charts" component={Charts} />
						</Switch>
						<Footer />
					</section>
				</section>
			</Fragment>
		) : (
			""
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		sidebarState: state.helper.sidebarState
	};
};

const mapDispatchToProps = dispatch => {
	return {
		loadUser: () => dispatch(loadUser())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(All);
