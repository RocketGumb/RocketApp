import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";
import { NavLink } from "react-router-dom";

class HeaderSettings extends Component {
	render() {
		return (
			<div className="header_user__setting__modal">
				<NavLink to="/" onClick={this.props.logout}>
					Выйти
				</NavLink>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => {
			dispatch(logout());
		}
	};
};

export default connect(
	null,
	mapDispatchToProps
)(HeaderSettings);
