import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";

class HeaderSettings extends Component {
	render() {
		return (
			<div className="header_user__setting__modal">
				<p onClick={this.props.logout}>Выйти</p>
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
