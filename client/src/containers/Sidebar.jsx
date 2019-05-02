import React, { Component } from "react";
import { connect } from "react-redux";
// Wrapper for menu items
import SidebarLink from "../components/SidebarLink";

// Icons for menu items
import {
	faHome,
	faCheckSquare,
	faChartBar,
	faList
} from "@fortawesome/free-solid-svg-icons";

// Sidebar
class Sidebar extends Component {
	render() {
		const { sidebarState } = this.props;
		return (
			<aside className={sidebarState ? "sidebar" : "sidebar compact"}>
				<nav className="sidebar_navbar">
					<menu>
						<SidebarLink
							exact
							icon={faHome}
							title={sidebarState ? "Главная" : ""}
							to="/all"
						/>
						<SidebarLink
							icon={faCheckSquare}
							title={sidebarState ? "Задачи" : ""}
							to="/all/tasks"
						/>
						<SidebarLink
							icon={faList}
							title={sidebarState ? "Проекты" : ""}
							to="/all/projects"
						/>
						<SidebarLink
							icon={faChartBar}
							title={sidebarState ? "Графики" : ""}
							to="/all/charts"
						/>
					</menu>
				</nav>
			</aside>
		);
	}
}

const mapStateToProps = state => {
	return {
		sidebarState: state.helper.sidebarState
	};
};

export default connect(
	mapStateToProps,
	null
)(Sidebar);
