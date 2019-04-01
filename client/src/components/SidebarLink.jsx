import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Wrapper for menu items on component Sidebar
function SidebarLink({ title, icon, ...rest }) {
	return (
		<li className="sidebar_item">
			<NavLink
				{...rest}
				className="sidebar_link"
				activeClassName="sidebar_link__active"
			>
				<FontAwesomeIcon icon={icon} /> {title}
			</NavLink>
		</li>
	);
}

export default SidebarLink;
