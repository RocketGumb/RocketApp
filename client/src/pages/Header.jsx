import React from "react";
import { Link } from "react-router-dom";

function Header() {
	return (
		<header className="header">
			<div className="header_container">
				<h1 className="white header_title">
					<Link className="h1" to="/">
						Rocket
						<strong>List</strong>
					</Link>
				</h1>
			</div>
		</header>
	);
}

export default Header;
