import React, { Fragment, Component } from "react";
import { Route, Switch } from "react-router-dom";

// import Containers
import Header from "./Header";
import Sidebar from "./Sidebar";
import Tasks from "./Tasks";
import Footer from "./Footer";

const Charts = () => {
	return <h1>Charts</h1>;
};

class All extends Component {
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

export default All;
