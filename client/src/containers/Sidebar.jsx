import React, { Component } from "react";
import { connect } from "react-redux";
// Wrapper for menu items
import SidebarLink from "../components/SidebarLink";

// Icons for menu items
import {
	faHome,
	faCheckSquare,
	faChartBar
} from "@fortawesome/free-solid-svg-icons";

// Sidebar
class Sidebar extends Component {
	render() {
		return this.props.sidebarState ? (
			<aside className="sidebar">
				<nav className="sidebar_navbar">
					<menu>
						<SidebarLink exact icon={faHome} title="Главная" to="/all" />
						<SidebarLink icon={faCheckSquare} title="Задачи" to="/all/tasks" />
						<SidebarLink icon={faChartBar} title="Графики" to="/all/charts" />
					</menu>
				</nav>
			</aside>
		) : (
			<aside className="sidebar compact">
				<nav className="sidebar_navbar">
					<menu>
						<SidebarLink exact icon={faHome} title="" to="/all" />
						<SidebarLink icon={faCheckSquare} title="" to="/all/tasks" />
						<SidebarLink icon={faChartBar} title="" to="/all/charts" />
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
