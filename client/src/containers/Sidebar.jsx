import React, { Component } from "react";
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
		return (
			<aside className="sidebar">
				<nav className="sidebar_navbar">
					<menu>
						<SidebarLink exact icon={faHome} title="Главная" to="/all" />
						<SidebarLink icon={faCheckSquare} title="Задачи" to="/all/tasks" />
						<SidebarLink icon={faChartBar} title="Графики" to="/all/charts" />
					</menu>
				</nav>
			</aside>
		);
	}
}

export default Sidebar;
